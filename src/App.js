import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [initialRepositories, setInitialRepositories] = useState([]);
  const [repositories, setRepositories] = useState([]);

  const handleOnChange = (event) => {
    let filteredData = initialRepositories.filter((repo) =>
      repo.name.match(event.target.value)
    );
    setRepositories(filteredData);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.github.com/users/ianfilipe/repos",
        {
          headers: {
            Authorization: "token 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",
          },
        }
      );
      const data = await response.json();
      setInitialRepositories(data);
      setRepositories(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);
    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }

  return (
    <div className="container">
      <input
        onChange={handleOnChange}
        className="input"
        placeholder="Pesquise por um repositório"
      />
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <a target="_blank" href={repo.svn_url}>
              {repo.name}
            </a>
            {repo.favorite && <span className="favorite">(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
            <span className="visibility">{repo.visibility}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
