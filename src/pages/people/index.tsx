import GetData from "../../@core/hook/FetchingData";
import type { GetPeoplesResponse } from "../../interface/people/GetPeopleResponse";
import Container from "../../components/root/Container";
import PeopleCard from "./component/PeopleCard";

const PeoplePage = () => {
  const { data: listPople } = GetData<GetPeoplesResponse>(
    `/person/popular?language=en-US&page=1`,
    ["getlistPople"],
    {
      page: 1,
    },
    {
      results: [],
    }
  );
  if (!listPople) {
    return <div>No Movies Found</div>;
  }
  return (
    <Container className="bg-black grid pt-40 sm: grid-cols-2 gap-10  md:grid-cols-4">
      {listPople.results.map((item, index) => (
        <PeopleCard
          id={`${item.id}`}
          key={index}
          name={item.name}
          popularity={`${item.popularity}`}
          knownFor={item.known_for[0].title}
          imageUrl={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
        />
      ))}
    </Container>
  );
};

export default PeoplePage;
