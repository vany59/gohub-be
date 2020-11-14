import * as _ from "lodash";
export const Filters = (filters) => {
  if (filters) {
    let item = {};
    filters.forEach(({ key, value }) => {
      item[key] = value;
    });
    return item;
  } else {
    return {};
  }
};

export const Sorts = (sorts) => {
  if (sorts) {
    let item = {};
    sorts.forEach(({ key, value }) => {
      item[key] = value.toUpperCase();
    });
    return item;
  } else {
    return {};
  }
};

export const CheckMission = (session, missions = []) => {
  if (session.isRoot) return true;
  return missions.some((e) =>
    session.missions.find(
      (m) =>
        m.mission == e.mission &&
        !_.difference(e.privileges, m.privileges).length
    )
  );
};
