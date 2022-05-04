export const findPokemons = async ({ page, limit }) => {
  try {
    const offset = (page - 1) * limit;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    ).then((res) => res.json());
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const findOnePokemon = async (name) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    ).then((res) => res.json());
    return response;
  } catch (error) {
    console.error(error);
  }
};
