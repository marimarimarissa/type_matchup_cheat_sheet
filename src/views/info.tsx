import { Pokemon } from "../models/pokemon.ts";
import { capitalizeFirstLetter } from "../composables/displayer.ts";
import { getTypeConstant, getTypeSprite } from "../composables/typeParser.ts";

export default function PokemonInfo(pokemon: Pokemon) {
    function Pokemon_Types(){
      if(pokemon?.types.length > 0) {
        const type1 = getTypeSprite(pokemon?.types[0]);
        const type2 = pokemon?.types.length > 1 ? getTypeSprite(pokemon?.types[1]) : "";
        return (
          <>
            <div id="pokemon_types">
              <h2>
                {type2.length === 0 ? "Type:" : "Types:"}
              </h2>
              <img src={type1} />
              <img src={type2} />
            </div>
          </>
        )
      }
      return(<p>Something went wrong :c</p>)
    }

    function Damage_Relations(){
      let  weaknesses_2x: any[]  = [];
      let weaknesses_4x: any[] = [];
      let resistances_2x: any[] = [];
      let resistances_4x: any[] = [];
      let immunities: any[] = [];
    
      if(pokemon?.types.length > 0) {
        weaknesses_2x = [];
        pokemon?.types[0].damage_relations.double_damage_from.forEach((type:any) => {
          weaknesses_2x.push(getTypeSprite(getTypeConstant(type.name)))
        });

        pokemon?.types[0].damage_relations.half_damage_from.forEach((type:any) => {
          resistances_2x.push(getTypeSprite(getTypeConstant(type.name)))
        });

        pokemon?.types[0].damage_relations.no_damage_from.forEach((type:any) => {
          immunities.push(getTypeSprite(getTypeConstant(type.name)))
        });
      }

      if(pokemon?.types.length > 1) {
        pokemon?.types[1].damage_relations.double_damage_from.forEach((type:any) => {
          weaknesses_2x.push(getTypeSprite(getTypeConstant(type.name)))
        });

        pokemon?.types[1].damage_relations.half_damage_from.forEach((type:any) => {
          resistances_2x.push(getTypeSprite(getTypeConstant(type.name)))
        });

        pokemon?.types[1].damage_relations.no_damage_from.forEach((type:any) => {
          immunities.push(getTypeSprite(getTypeConstant(type.name)))
        });
      }

      weaknesses_2x = weaknesses_2x.slice().sort();
      if(weaknesses_2x.length > 0) {
        for (let i = 0; i < weaknesses_2x.length - 1; i++) {
          if (weaknesses_2x[i] == weaknesses_2x[i + 1]){
            weaknesses_4x.push(weaknesses_2x[i]);
            weaknesses_2x.splice(i, 2);
          }
          if (weaknesses_2x[i] == weaknesses_2x[i -1]){
            weaknesses_4x.push(weaknesses_2x[i]);
            weaknesses_2x.splice(i-1, 2);
          }
          if (resistances_2x.indexOf(weaknesses_2x[i]) != -1){
            weaknesses_2x.splice(i, 1)
          }
        }        
      }

      for (let i = 0; i < weaknesses_2x.length; i++) {
        if (resistances_2x.indexOf(weaknesses_2x[i]) != -1){
          weaknesses_2x.splice(i, 1)
        }
      }   
      
      for (let i = 0; i < weaknesses_2x.length; i++) {
        if (immunities.indexOf(weaknesses_2x[i]) != -1){
          weaknesses_2x.splice(i, 1)
        }
      }

      resistances_2x = resistances_2x.slice().sort();
      if(resistances_2x.length > 0) {
        for (let i = 0; i < resistances_2x.length - 1; i++) {
          if (resistances_2x[i] == resistances_2x[i + 1]){
            resistances_4x.push(resistances_2x[i]);
            resistances_2x.splice(i, 2);
          }
          if (resistances_2x[i] == resistances_2x[i -1]){
            resistances_4x.push(resistances_2x[i]);
            resistances_2x.splice(i-1, 2);
          }

        }        
      }

      for (let i = 0; i < resistances_2x.length; i++) {
        if (immunities.indexOf(resistances_2x[i]) != -1){
          resistances_2x.splice(i, 1)
        }
      }

      function Weakness_2x_Component() {
        if (weaknesses_2x.length > 0) {
          return (
            <>
              <div>
                <h2>Weakness:</h2>
                {weaknesses_2x.map(function(weakness_2x)
                  {
                    return <img src={weakness_2x}/>;
                  }
                )}
              </div>
            </>
          )
        }
        return "";
      }

      function Weakness_4x_Component() {
        if (weaknesses_4x.length > 0) {
          return (
            <>
              <div>
                <h2>2x Weakness:</h2>
                {weaknesses_4x.map(function(weakness_4x)
                  {
                    return <img src={weakness_4x}/>;
                  }
                )}
              </div>
            </>
          );
        }

        return "";
      }

      function Resistances_2x_Component() {
        if (resistances_2x.length > 0) {
          return (
            <>
              <div>
                <h2>Resistances:</h2>
                {resistances_2x.map(function(resistance)
                  {
                    return <img src={resistance}/>;
                  }
                )}
              </div>
            </>
          );
        }
      }

      function Resistances_4x_Component() {
        if (resistances_4x.length > 0) {
          return (
            <>
              <div>
                <h2>2x Resistances:</h2>
                {resistances_4x.map(function(resistance)
                  {
                    return <img src={resistance}/>;
                  }
                )}
              </div>
            </>
          );
        }
      }

      function Immunities_Component() {
        if (immunities.length > 0) {
          return (
            <>
              <div>
                <h2>Immunities:</h2>
                {immunities.map(function(immunity)
                  {
                    return <img src={immunity}/>;
                  }
                )}
              </div>
            </>
          );
        }
      }

      return (
        <>
          <div className="pokemon_types">
            <Weakness_2x_Component />
            <Weakness_4x_Component />
            <Resistances_2x_Component />
            <Resistances_4x_Component />
            <Immunities_Component />
          </div>
        </>
      )
    }

    function Pokemon_Name() {
      let name = pokemon?.name.replace("-", " ")
      name = capitalizeFirstLetter(name ?? "")
      return(
        <h2>Name: {name}</h2>
      ) 
    }

    function Pokemon_Image() {
      if(pokemon.name == "flareon"){
        return (
          <img style={{width: "120px"}} src="https://64.media.tumblr.com/264e02eab2c33aaddd7bfb5629af4938/tumblr_pgrrorUjZq1w2f1n2o5_400.png" />
        )
      }
      return (            
        <img src={pokemon.sprites.male_default} />
      )
    }

    return (
        <>
        <div>
            <Pokemon_Name />
            <Pokemon_Image />
              <div>
                {<Pokemon_Types />}
                {<Damage_Relations />}
              </div>
        </div>
        </>
    );
}