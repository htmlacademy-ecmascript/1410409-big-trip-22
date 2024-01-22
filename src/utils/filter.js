export const filter = {
  EVERYTHING: (events) => events,
  PAST: (events) => events.filter((event) => new Date(event.dateTo) < new Date()),
  PRESENT: (events) => events.filter((event) => new Date(event.dateFrom) <= new Date() && new Date(event.dateTo) >= new Date()),
  FUTURE: (events) => events.filter((event) => new Date(event.dateFrom) > new Date()),
};
