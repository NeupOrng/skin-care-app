import { IMeeting, Meeting } from './meeting'

interface IMeetingHistory {
  'id': number,
  'email': string,
  'fullname': string,
  'phone_number': string,
  'facebook': string,
  'location': string,
  'lat': string,
  'lng': string,
  'updated_at': string,
  'status_id': number,
  'meeting': Array<IMeeting>
}

class MeetingHistory implements IMeetingHistory {
  'id': number;
  'email': string;
  'fullname': string;
  'phone_number': string;
  'facebook': string;
  'location': string;
  'lat': string;
  'lng': string;
  'updated_at': string;
  'status_id': number;
  'meeting': Array<Meeting>;
  constructor (init: IMeetingHistory) {
    Object.assign(this, init)
    this.meeting = init.meeting.map((item) => new Meeting(item))
  }
}

export {
  IMeetingHistory,
  MeetingHistory
}
