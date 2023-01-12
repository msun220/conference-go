// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload')
if (payloadCookie) {
  // The cookie value is a JSON-formatted string, so parse it
  // My Note: apparently my cookie values are not json strings so skip it and go straight to decoding
  // const encodedPayload = JSON.parse(payloadCookie.value);

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(payloadCookie.value)

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload)

  // Print the payload
  // console.log(payload);

  const loginTag = document.getElementById('login-link');
  loginTag.classList.add('d-none');

  // Check if "events.add_conference" is in the permissions.
  // If it is, remove 'd-none' from the link
  if (payload.user.perms.includes("events.add_conference")) {
    const conferenceTag = document.getElementById('new-conference-link');
    conferenceTag.classList.remove('d-none');
  }

  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link
  if (payload.user.perms.includes("events.add_location")) {
    const locationTag = document.getElementById('new-location-link');
    locationTag.classList.remove('d-none');
  }

  if (payload.user.perms.includes("presentations.add_presentation")) {
    const presentationTag = document.getElementById('new-presentation-link');
    presentationTag.classList.remove('d-none');
  }



}
