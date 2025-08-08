import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, state, redirect_uri } = await request.json();

    if (!code || !state || !redirect_uri) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // Naver에서 액세스 토큰 요청
    const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
        client_secret: process.env.NAVER_CLIENT_SECRET!,
        redirect_uri: redirect_uri,
        code: code,
        state: state,
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
    const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
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

    if (userData.resultcode !== '00') {
      return NextResponse.json(
        { error: '사용자 정보를 가져올 수 없습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        email: userData.response?.email || '',
        name: userData.response?.name || userData.response?.nickname || '',
        id: userData.response?.id || '',
        picture: userData.response?.profile_image || '',
      },
    });
  } catch (error) {
    console.error('Naver OAuth 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}