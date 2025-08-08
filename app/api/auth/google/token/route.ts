import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, redirect_uri } = await request.json();

    console.log('Google OAuth API 호출:');
    console.log('- Code:', code ? 'present' : 'missing');
    console.log('- Redirect URI:', redirect_uri);

    if (!code || !redirect_uri) {
      return NextResponse.json(
        { error: '필수 매개변수가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    console.log('- Client ID:', clientId ? 'present' : 'missing');
    console.log('- Client Secret:', clientSecret ? 'present' : 'missing');

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Google OAuth 설정이 올바르지 않습니다.' },
        { status: 500 }
      );
    }

    // Google에서 액세스 토큰 요청
    console.log('Google 토큰 요청 시작...');
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri,
      }),
    });

    console.log('토큰 응답 상태:', tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Google 토큰 요청 실패:', errorData);
      return NextResponse.json(
        { error: `토큰 요청에 실패했습니다: ${errorData}` },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();
    console.log('토큰 데이터 수신 성공');

    // 사용자 정보 요청
    console.log('Google 사용자 정보 요청 시작...');
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    console.log('사용자 정보 응답 상태:', userResponse.status);

    if (!userResponse.ok) {
      const errorData = await userResponse.text();
      console.error('Google 사용자 정보 요청 실패:', errorData);
      return NextResponse.json(
        { error: `사용자 정보 요청에 실패했습니다: ${errorData}` },
        { status: 400 }
      );
    }

    const userData = await userResponse.json();
    console.log('사용자 정보 수신 성공:', { email: userData.email, name: userData.name });

    return NextResponse.json({
      success: true,
      user: {
        email: userData.email,
        name: userData.name,
        id: userData.id,
        picture: userData.picture,
      },
    });
  } catch (error) {
    console.error('Google OAuth 오류:', error);
    return NextResponse.json(
      { error: `인증 처리 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}