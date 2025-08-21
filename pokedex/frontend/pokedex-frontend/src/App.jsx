import { useState } from 'react'
import './App.css'

function Pokedex() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading]=useState(false)
  const [error,setError]= useState('')
  
  const handleSearch = async()=>{
    if (pokemonName.trim()===''){
      setError('nada');
      return;
    }
    
    setLoading(true);
    setError('');
    setPokemonData(null);

    try{
      const response = await fetch (`http://localhost:8000/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok){
        throw new Error("Pokemon not found")
      }
    

      const data = await response.json();
        setPokemonData(data);

    }catch (err){
        setError(err.message);
      }  
      finally{
        setLoading(false)
      }
    }
  return (
   
      <div className='flex flex-col justify-center items-center'>
        <div className='flex font-bold justify-center text-red-500 text-7xl '>POKEDEX</div>
        <div>
          <input
            type="text"
            placeholder="Type PKMN name or № "
            className="          
              w-[200px]
              border
              border-gray-300
              value={pokemonName}
            "
            onChange={(e) => setPokemonName(e.target.value)}
            onKeyDown= {(e)=>{
                if (e.key === 'Enter')
                  handleSearch();}}
        /> 
          <button onClick={handleSearch} className='
            border
            border-gray-300
            w-[100px]
            '
          >Search</button>
        </div>
          <button className='
            border
            border-gray-300
            w-[300px]
            rounded-full
            '
          >Random</button>

          <div>
            {pokemonData && (    
              <div>       
            <div className='text-2xl font-bold capitalize text-center'>{pokemonData.name}</div>
            <img src ={pokemonData.sprite} alt={pokemonData.name} className='w-[200%] h-[200%]'/>
            <div className='text-center'>
              <p>ID:{pokemonData.id}</p>
              <p>Type:{pokemonData.types?.map (t=>t.type.name).join(',')}</p>
              <p>Abilities:{pokemonData.abilities?.map (a=>a.ability.name).join(',')}</p>
            </div>
              </div>
            )}
          </div>
      </div>
    
  )
}

export default Pokedex
