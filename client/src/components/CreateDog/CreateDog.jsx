import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions";
import backgroundHome from '../Img/backgroundHome.webp';
import s from './CreateDog.module.css'

// Validacion de errores con regex

function validate(input) {
    var errors = {};
  
  
    if (!input.name || !/^[A-Za-z\s]+$/g.test(input.name)){
      errors.name = "❌ Only letters!";
  }
  if(!input.heightMin || !/^[1-9]\d*(\.\d+)?$/.test(input.heightMin)){
      errors.heightMin = '❌ Only numbers';
  }
  if(!input.heightMax || !/^[1-9]\d*(\.\d+)?$/.test(input.heightMax)){
      errors.heightMax = '❌ Only numbers';
  }
  if(parseInt(input.heightMax) <= parseInt(input.heightMin)){
      errors.heightMin = '❌ Min value cannot be greater than the max';
  }
  if(!input.weightMin || !/^[1-9]\d*(\.\d+)?$/.test(input.weightMin)){
      errors.weightMin = '❌ Only numbers';
  }
  if(!input.weightMax || !/^[1-9]\d*(\.\d+)?$/.test(input.weightMax)){
      errors.weightMax = '❌ Only numbers';
  }
  if(parseInt(input.weightMax) <= parseInt(input.weightMin)){
      errors.weightMin = '❌ Min value cannot be greater than the max';
  }
  if(!input.lifespanMin || !/^[1-9]\d*(\.\d+)?$/.test(input.lifespanMin)){
      errors.lifespanMin = '❌ Only numbers';
  }
  if(!input.lifespanMax || !/^[1-9]\d*(\.\d+)?$/.test(input.lifespanMax)){
  errors.lifespanMax = '❌ Only numbers';
  }
  if(parseInt(input.lifespanMax) <= parseInt(input.lifespanMin)){
      errors.lifespanMin = '❌ Min value cannot be greater than the max';
  }
  if (input.image && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.image) ){
      errors.image = '❌ Must be an URL or be empty';
  }
  return errors
  }

  export default function CreateDog(){
    const [input, setInput] = useState({
        name: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        lifespanMin: "",
        lifespanMax: "",
        image: "",
        temperament: []
        })

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const allTemps = useSelector((state) => state.temperaments);

    validate(input);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    };

    function handleSelect(e){
        if(input.temperament.includes(e.target.value)) alert('Temperament has already been entered')
        else if(input.temperament.length === 4) alert('You cannot enter more than 4 temperaments')
        else{
            setInput({
              ...input,
              temperament: [...input.temperament, e.target.value],
            });
            console.log(input.temperament);
        }
    }

    function handleDelete(el){
        setInput({
          ...input,
          temperament: input.temperament.filter((e) => e !== el),
        });
      }

    function handleSubmit(e){
        e.preventDefault();
        if (
            input.name !== "" &&
            /^[A-Za-z\s]+$/g.test(input.name) &&
            input.heightMin !== "" &&
            parseInt(input.heightMax) > parseInt(input.heightMin) &&
            input.weightMin !== "" &&
            parseInt(input.weightMax) > parseInt(input.weightMin) &&
            input.lifespanMin !== "" &&
            parseInt(input.lifespanMax) > parseInt(input.lifespanMin) &&
            input.temperament.length !== 0 && 
            /[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.image)
          ){
        dispatch(createDog(input));
        setInput({
            name: "",
            weightMin: "",
            weightMax: "",
            heightMin: "",
            heightMax: "",
            lifespanMin: "",
            lifespanMax: "",
            image: "",
        });
        history.push('/home');
        } else {
        alert('Please, fill in the fields correctly');
        }
    }

    useEffect(() => {
        dispatch(getTemperaments());
      }, [dispatch]);

    return(
        <div>
            <img src={backgroundHome} alt='background-create' className={s.background}/>
            <Link to='/home'>
                <button className={s.btnhome}>Back to Home</button>
            </Link>
        <div className={s.allContainer}>
            <div className={s.container}>
                <h1 className={s.title}>Create your own dog</h1>
                <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={s.divname}>
                        <div className={s.name}>
                            <label><u>Name:</u></label>
                            <input name="name" type='text' 
                            placeholder="Enter the name..."  
                            onChange={(e) => handleChange(e)}
                            style={{height: '24px'}}/>
                        </div>
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div className={s.div}>
                        <div className={s.div2}>
                            <div className={s.text}>
                                <label><u>Weight min:</u> </label>
                                <input name="weightMin" type='number' 
                                min='1' max='100' placeholder="Min" 
                                onChange={(e) => handleChange(e)}
                                style={{height: '24px'}}/> kg.
                            </div>
                            <div className={s.text}>
                                <label><u>Weight max:</u> </label>
                                <input name="weightMax" type='number' 
                                min='1' max='100' placeholder="Max"  
                                onChange={(e) => handleChange(e)}
                                style={{height: '24px'}}/> kg.
                            </div>
                        </div>
                        <div className={s.div2}>
                            {errors.weightMin && <p>{errors.weightMin}</p>}
                            {errors.weightMax && <p>{errors.weightMax}</p>}
                        </div>
                    </div>
                    <div className={s.div}>
                        <div className={s.div2}>
                            <div className={s.text}>
                                <label><u>Height min:</u> </label>
                                <input name="heightMin" type='number' 
                                min='1' max='100' placeholder="Min"  
                                onChange={(e) => handleChange(e)}
                                style={{height: '24px'}}/> cm.
                            </div>
                            <div>
                                <label><u>Height max:</u> </label>
                                <input name="heightMax" type='number' 
                                min='1' max='100' placeholder="Max"  
                                onChange={(e) => handleChange(e)}
                                style={{height: '24px'}}/> cm.
                            </div>
                        </div>
                        <div className={s.div2}>
                            {errors.heightMin && <p>{errors.heightMin}</p>}
                            {errors.heightMax && <p>{errors.heightMax}</p>}
                        </div>
                    </div>
                    <div className={s.div}>
                        <div className={s.div2}>
                            <div className={s.text}>
                                <label><u>Life time min:</u> </label>
                                <input name="lifespanMin" type='number' 
                                min='1' max='100' placeholder="Min"  
                                onChange={(e) => handleChange(e)}
                                style={{height: '24px'}}/> years.
                            </div>
                            <div>
                                <label><u>Life time max:</u> </label>
                                <input name="lifespanMax" type='number' 
                                min='1' max='100' placeholder="Max"  
                                onChange={(e) => handleChange(e)}
                                style={{height: '24px'}}/> years.
                            </div>
                        </div>
                        <div className={s.div2}>
                            {errors.lifespanMin && (<p>{errors.lifespanMin}</p>)}
                            {errors.lifespanMax && (<p>{errors.lifespanMax}</p>)}
                        </div>
                    </div>
                    <div className={s.divname}>
                        <div className={s.name}>
                            <label><u>Image:</u> </label>
                            <input type='imagen' name="image" 
                            placeholder="URL"  
                            onChange={(e) => handleChange(e)}
                            style={{height: '24px'}}/>
                        </div>
                        {errors.image && (<p>{errors.image}</p>)}
                    </div>
                    <div className={s.divname}>
                        <div className={s.temps}>
                            <label><u>Temperaments:</u> </label>
                            <select onChange={(e) =>handleSelect(e)} style={{height: '25px', outline: 'none'}}>
                                {
                                    allTemps.map((t) =>(
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                    ))
                                }
                            </select>
                            <div className={s.selected}>
                                <label><u>Selected:</u> </label>
                                {
                                    input.temperament.map((e) =>(
                                        <button className={s.btndelete} type="button" onClick={() =>handleDelete(e)} key={e} >{e}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={s.btnContainer}>
                        <button className={s.btn} type="submit" >Crear!</button>
                    </div>
                </form>
            </div>
            <div>
      </div>
        </div>
        </div>
    )
}