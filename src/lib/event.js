/**
 * [Event description]
 */
class Event {
  static get INIT_DATABASE() { return 'Event::INIT_DATABASE'; }

  static get INIT_HCS_WATCHER() { return 'Event::INIT_HCS_WATCHER'; }

  static get INIT_MED_REQUEST_SOCKET_HANDLER() { return 'Event::INIT_MED_REQUEST_SOCKET_HANDLER'; }

  static get INIT_FOTO_FINDER_SOCKET_HANDLER() { return 'Event::INIT_FOTO_FINDER_SOCKET_HANDLER'; }

  static get INIT_SYNMEDICO_SOCKET_HANDLER() { return 'Event::INIT_SYNMEDICO_SOCKET_HANDLER'; }

  static get INIT_LB_SYSTEMS_SOCKET_HANDLER() { return 'Event::INIT_LB_SYSTEMS_SOCKET_HANDLER'; }

  static get SNACKBAR_ADD() { return 'Event::SNACKBAR_ADD'; }

  static get SHOW_CLICK_BLOCKER() { return 'Event::SHOW_CLICK_BLOCKER'; }

  static get HIDE_CLICK_BLOCKER() { return 'Event::HIDE_CLICK_BLOCKER'; }

  static get SEND_REQUEST() { return 'Event::SEND_REQUEST'; }

  static get DATABASE_READY() { return 'Event::DATABASE_READY'; }
}

export default Event;
