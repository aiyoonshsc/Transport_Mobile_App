import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, redirect_uri } = await request.json();

    if (!code || !redirect_uri) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // Kakao에서 액세스 토큰 요청
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
        client_secret: process.env.KAKAO_CLIENT_SECRET!,
        redirect_uri: redirect_uri,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json(
        { error: '토큰 요청에 실패했습니다.', details: errorData },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    // 사용자 정보 요청
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: '사용자 정보 요청에 실패했습니다.' },
        { status: 400 }
      );
    }

    const userData = await userResponse.json();

    return NextResponse.json({
      success: true,
      user: {
        email: userData.kakao_account?.email || '',
        name: userData.kakao_account?.profile?.nickname || '',
        id: userData.id.toString(),
        picture: userData.kakao_account?.profile?.profile_image_url || '',
      },
    });
  } catch (error) {
    console.error('Kakao OAuth 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}