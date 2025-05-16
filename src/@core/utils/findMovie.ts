import { movieItem } from "../../components/root/data/header";

export function findMovie(searchParam: string) {
  const filter = movieItem.find((movieFilter) => {
    return movieFilter.id === searchParam;
  });

  return filter?.id;
}
