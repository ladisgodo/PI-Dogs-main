/* import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, createDog } from "../../redux/actions";


export default function CreateDog(){

    const [input, setInput] = useState({
        name: '',
        weightMin: '',
        weightMax: '',
        heightMin: '',
        heightMax: '',
        lifespanMin: '',
        lifespanMax: '',
        image: '',
        temperament: [],
    });

    const dispatch = useDispatch();
    const allTemps = useSelector((state) => state.temperaments);

    useEffect(() =>{
        dispatch(getTemperaments())
    },[dispatch]);

    function handleChange(e){
        console.log(input);
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    function handleTemps(e){
        if(input.temperament.length < 4){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        } else {
            alert('No puede tener mas de 4 temperamentos');
        }
        console.log(input.temperament)
    };

    function handleDelete(e){
        setInput({
            ...input,
            temperament: input.temperament.filter((t) => t !== e)
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        if(
            input.name !== '' &&
            input.weightMin  &&
            input.weightMax  &&
            input.weightMax > input.weightMin &&
            input.heightMin  &&
            input.heightMax  &&
            input.heightMax > input.heightMin &&
            input.lifespanMin  &&
            input.lifespanMax  &&
            input.lifespanMax > input.lifespanMin &&
            input.temperament.length !== 0
        ){
            dispatch(createDog(input));
            console.log(input);
            alert('Dog created!!!!');
            setInput({
                name: '',
                weightMin: '',
                weightMax: '',
                heightMin: '',
                heightMax: '',
                lifespanMin: '',
                lifespanMax: '',
                image: '',
                temperament: [],
            });
        } else {
            alert('The required fields are empty')
        }
    }


    return(
        <div>
            <Link to='/home'>
                <button>Back to home</button>
            </Link>
            <h1>VAMO A CREAR</h1>
            <form onSubmit={(e) =>handleSubmit(e)} >
                <div>
                    <label>Name:</label>
                    <input name='name' placeholder="Enter the name..." type='text' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Weight:</label>
                    <input name='weightMin' placeholder="Min" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                    <input name='weightMax' placeholder="Max" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Height:</label>
                    <input name='heightMin' placeholder="Min" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                    <input name='heightMax' placeholder="Max" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Life span:</label>
                    <input name='lifespanMin' placeholder="Min" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                    <input name='lifespanMax' placeholder="Max" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Image:</label>
                    <input name='image' placeholder="URL" type='imagen' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Temperaments:</label>
                    <select onChange={(e) =>handleTemps(e)}>
                        <option hidden value=''>Choose temperaments</option>
                        {
                            allTemps.map((t) => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))
                        }
                    </select>
                    <ul>
                            {input.temperament.map((t) =>(
                        <li key={t}>
                                <button onClick={() =>handleDelete(t)} >{t}</button>
                        </li>
                            ))}
                    </ul>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
} */

import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, createDog } from "../../redux/actions";

//---------------VALIDACION DE ERRORES EN LOS INPUTS------------------------


function validate(input) {
  let errors = {};


  if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)){
    errors.name = "❌ The first letter must be uppercase";
} else {
  errors.name = "✅Done!"
}

if(!input.heightMin || !/^[1-9]\d*(\.\d+)?$/.test(input.heightMin)){
    errors.heightMin = '❌ Only numbers';
}else {
  errors.heightMin = "✅Done!"
}
if(!input.heightMax || !/^[1-9]\d*(\.\d+)?$/.test(input.heightMax)){
    errors.heightMax = '❌ Only numbers';
} else {
  errors.heightMax = "✅Done!"
}
if(input.heightMax <= input.heightMin){
    errors.heightMin = '❌ Min value cannot be greater than the max';
}

if(!input.weightMin || !/^[1-9]\d*(\.\d+)?$/.test(input.weightMin)){
    errors.weightMin = '❌ Only numbers';
}
if(!input.weightMax || !/^[1-9]\d*(\.\d+)?$/.test(input.weightMax)){
    errors.weightMax = '❌ Only numbers';
}
if(input.weightMax <= input.weightMin){
    errors.weightMin = '❌ Min value cannot be greater than the max';
}
if(!input.lifespanMin || !/^[1-9]\d*(\.\d+)?$/.test(input.lifespanMin)){
    errors.lifespanMin = '❌ Only numbers';
}
if(!input.lifespanMax || !/^[1-9]\d*(\.\d+)?$/.test(input.lifespanMax)){
errors.lifespanMax = '❌ Only numbers';
}
if(input.lifespanMax <= input.lifespanMin){
    errors.lifespanMin = '❌ Min value cannot be greater than the max';
}
if (input.img && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.img) ){
    errors.img = '❌ Must be an URL or be empty';
}
if (input.temperament.length <= 2){
    errors.temperament = "❌ The dog can't have more than three temperaments!";
}
return errors
}


//-------------------------------------------------------------------------------

export default function PostDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  let id = 265;

  const [input, setInput] = useState({
    name: '',
    weightMin: '',
    weightMax: '',
    heightMin: '',
    heightMax: '',
    lifespanMin: '',
    lifespanMax: '',
    image: '',
    temperament: [],
    id: id
});

  //console.log(temperaments)

  //al estado input ademas de lo que tiene le agrega el e.target.value de lo que este modificando
  //va llenando el estado que planteamos arriba
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    //console.log(input)
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.name,
      })
    );
    //console.log(input)
  }

  function handleSelect(e) {
    if (input.temperament.length === 3) {
      alert("The dog can't have more than three temperaments!");
    } else if (input.temperament.length < 3) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== el),
    });
    console.log(input);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input)
    if (
      
      input.name !== "" &&
      input.heightMin !== "" &&
      input.heightMax > input.heightMin &&
      input.weightMin !== "" &&
      input.weightMax > input.weightMin &&
      input.lifespanMin !== "" &&
      input.weightMax > input.weightMin &&
      input.temperament.length !== 0
    ){
      dispatch(createDog(input));
    alert("Done!");
    setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      lifespanMin: "",
      lifespanMax: "",
      image: "",
      temperaments: [],
    });
    id++;
    history.push("/home")
    } else {
        alert("Required elements are missing!")
    };
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div >
      <Link to="/home">
        <button> Back to home</button>
      </Link>
      <h1>Create a new dog!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>* : Required</p>
        {/*--------INPUTS-------------------------------------------------------*/}
        {/*--------raza---------------------------------------------------------*/}

        <div>
          <label>*Breed:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            id="name"
            required
            placeholder="Enter the breed..."
            onChange={(e) => handleChange(e)}
          />

          {/* </div> */}
          {/*--------tamaño-----------------------------------------------------------------*/}
          <div>
            <label>*Size:</label>
            <br />
            <div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={input.heightMin}
                  name="heightMin"
                  id="heightMin"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />
                cm.
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={input.heightMax}
                  name="heightMax"
                  id="heightMax"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />
                cm.
              </div>
            </div>
          </div>
          {/*-------peso------------------------------------------------------------------*/}
          <div>
            <label>*Weight:</label>
            <br />
            <div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={input.weightMin}
                  name="weightMin"
                  id="weightMin"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />
                kg.
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={input.weightMax}
                  name="weightMax"
                  id="weightMax"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />
                kg.
              </div>
            </div>
          </div>
          {/*-------años-----------------------------------------------------------------*/}
          <div>
            <label>*Lifespan:</label>
            <br />
            <div>
              <div>
                <input
                  min="1"
                  max="100"
                  type="number"
                  value={input.lifespanMin}
                  name="lifespanMin"
                  id="lifespanMin"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />{" "}
                year/s
              </div>
              <div>
                <input
                  min="1"
                  max="100"
                  type="number"
                  value={input.lifespanMax}
                  name="lifespanMax"
                  id="lifespanMax"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />{" "}
                years.
              </div>
            </div>
          </div>
          {/*------imagen----------------------------------------------------------------*/}
          {/* <div className={s.row}> */}
          <label>Image:</label>
          <input
            type="imagen"
            value={input.image}
            name="image"
            placeholder="URL"
            onChange={(e) => handleChange(e)}
          />
          {/* </div> */}
          {/*------temperamentos-----------------------------------------------------*/}
          {/* <div className={s.row}> */}
          <label>*Temperaments:</label>
          <select onChange={(e) => handleSelect(e)}>
            {temperaments.map((temperament) => (
              <option value={temperament.name} key={temperament.id}>
                {temperament.name}
              </option>
            ))}
          </select>
          <ul>
            <li key={"key"}>
              {input.temperament.map((el) => (
                <button
                  type="button"
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >
                  {el}
                </button>
              ))}
            </li>
          </ul>
        </div>

        <button type="submit">
          Create!
        </button>
      </form>
      <div>
        {errors.name && <p>{errors.name}</p>}
        {errors.heightMin && <p>{errors.heightMin}</p>}
        {errors.heightMax && <p>{errors.heightMax}</p>}
        {errors.weightMin && <p>{errors.weightMin}</p>}
        {errors.weightMax && <p>{errors.weightMax}</p>}
        {errors.lifespanMin && (
          <p>{errors.lifespanMin}</p>
        )}
        {errors.lifespanMax && (
          <p>{errors.lifespanMax}</p>
        )}
      </div>
    </div>
  );
}