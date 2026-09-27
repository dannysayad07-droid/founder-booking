import { google } from 'googleapis';

export function oauth() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export const scopes = [
  'https://www.googleapis.com/auth/calendar.freebusy',
  'https://www.googleapis.com/auth/calendar.events'
];

export function calendarClient(refreshToken: string) {
  const c = oauth();
  c.setCredentials({ refresh_token: refreshToken });

  return google.calendar({
    version: 'v3',
    auth: c
  });
}
