import { IStation } from '.';

export const search = (
  stations: IStation[],
  query: string | null,
): IStation[] => {
  const result: IStation[] = [];

  if (!query) {
    return result;
  }

  if (query && query.length === 1) {
    const lineId = query.toUpperCase();
    stations.forEach(station => {
      if (!station.lineIds.includes(lineId)) {
        return;
      }

      result.push(station);
    });
  } else if (query && query.length > 1) {
    const queryCleaned = query
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\s+/g, '\\s+');
    const queryRegex = new RegExp(`(^|\\s+)${queryCleaned}`, 'i');
    stations.forEach(station => {
      if (!queryRegex.test(station.name)) {
        return;
      }

      result.push(station);
    });
  }

  return result;
};
