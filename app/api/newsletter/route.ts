import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Integrate with your newsletter service
    // Examples below for popular services:

    // MAILCHIMP EXAMPLE:
    // const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    // const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    // const MAILCHIMP_DC = process.env.MAILCHIMP_DC; // e.g., "us1"
    //
    // const response = await fetch(
    //   `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `apikey ${MAILCHIMP_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email_address: email,
    //       status: 'subscribed',
    //     }),
    //   }
    // );

    // CONVERTKIT EXAMPLE:
    // const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    // const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    //
    // const response = await fetch(
    //   `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       api_key: CONVERTKIT_API_KEY,
    //       email: email,
    //     }),
    //   }
    // );

    // EMAILOCTOPUS EXAMPLE:
    // const EMAILOCTOPUS_API_KEY = process.env.EMAILOCTOPUS_API_KEY;
    // const EMAILOCTOPUS_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;
    //
    // const response = await fetch(
    //   `https://emailoctopus.com/api/1.6/lists/${EMAILOCTOPUS_LIST_ID}/contacts`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       api_key: EMAILOCTOPUS_API_KEY,
    //       email_address: email,
    //     }),
    //   }
    // );

    // For now, just log the email and return success
    console.log('Newsletter signup:', email);

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
