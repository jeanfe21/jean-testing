import { genreData } from "../../components/root/data/header";

export function findGenre(searchParam: number | string | undefined) {
  const foundGenre = genreData.find((genre) => {
    return genre.id == searchParam || genre.name == searchParam;
  });

  return foundGenre?.name;
}
