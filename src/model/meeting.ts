
interface IMeeting {
  'id': number,
  'created_at': string,
  'datetime': string,
  'user_id': number,
  'admin_id': number,
  'status_id': number,
  'description': string,
}

class Meeting implements IMeeting {
  'id': number;
  'created_at': string;
  'datetime': string;
  'user_id': number;
  'admin_id': number;
  'status_id': number;
  'description': string;
  constructor (init: IMeeting) {
    Object.assign(this, init)
  }
}

export {
  IMeeting,
  Meeting
}
