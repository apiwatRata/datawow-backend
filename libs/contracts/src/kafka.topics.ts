export const KAFKA_TOPICS = {
  AUTH:   { LOGIN: 'auth.login' },
  USERS:  { REGISTER: 'users.register', FIND_ALL: 'users.findAll' },
  CONCERTS: { GET_BY_ID: 'concerts.get_concert_by_id', CREATE: 'concerts.create_concert', DELETE: 'concerts.delete_concert', UPDATE: 'concerts.update_concert', GET_ALL: 'concerts.get_all_concerts' },
  RESERVATIONS: { RESERVE: 'reservations.reserve', CANCEL: 'reservations.cancel', GET_PERSONAL: 'reservations.get_personal_reservations', GET_ALL: 'reservations.get_all_reservations' },
};