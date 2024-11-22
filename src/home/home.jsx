import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import style from './home.module.css'
export const Home = () => {
    const NAME_URL = ('https://m4567.myxvest.ru/sohil_api/id.php')
    const POST_URL = ('https://m4567.myxvest.ru/sohil/api/post.php')
    const [name, setName] = useState([]);
    const [post, setPost] = useState([])
    const [isChecked, setIsChecked] = useState(()=>{
        return localStorage.getItem('darkMode') === 'true';
    });

    const fetchUserName = async() => {
        const request = await fetch(NAME_URL);
        const response = await request.json();
        setName(response);
        console.log(response);
    }
    
    const fetchPost = async() => {
        const request = await fetch(POST_URL);
        const response = await request.json();
        setPost(response)
        console.log(response)
    }

    useEffect(()=>{
        fetchUserName();
        fetchPost();
        document.body.style.backgroundColor = isChecked ? 'black' : '#f4f4f4';
        document.documentElement.style.setProperty('--global-color', isChecked ? 'white' : 'black');
        localStorage.setItem('darkMode', isChecked);
    },[isChecked])

    return(
        <>
        <div className={style.main}>
            <div className={style.header_img}>
                <h1>Venera</h1>
            </div>
            <div className={style.section}>
                {!name.length ? (
                    <h1>Loading ...</h1>
                )
                :
                (
                    name.map((item) => (
                        <div className={style.section_header} key={item.id}>
                            <div className={style.header}>
                        <div className={style.profil_header} key={item.id}>
                        <img src="../src/assets/avatar (1).svg" alt="Rasm bor" />
                        <button
                        className={style.follow_btn}
                        style={{
                            backgroundColor: isChecked ? 'white' : 'black',
                            color : isChecked ? 'black' : 'white',
                            border : isChecked ? '2px solid black' : '2px solid white'
                        }}
                        >
                            +
                        </button>                    
                        <p className={style.profil_name}>
                            <Link to={`/profile/${item.id}`}>{item.name}</Link>
                        </p>
                        </div>  
                        <div className={style.header_dot}>
                            <i className="fa-solid fa-ellipsis"></i>
                        </div>
                        </div>
                        <div className={style.section_div}>
                            <div 
                            className={style.section_post}
                            style={{boxShadow : isChecked ? '0 0 10px white' : '0 0 10px black'}}
                            >
                                    {post && 
                                        post.filter((p) => p.id === item.id).length > 0 
                                        ?
                                        (
                                        post.filter((p) => p.id === item.id).map((p) => (
                                        <ul key={item.id}>
                                        <li key={p.id}>Post: {p.post}</li>
                                        <li key={p.id}>Create : {p.create_at}</li>
                                        </ul>
                                    ))
                                ):
                                (
                                    <p>No post</p>
                                )
                                }
                            </div>
                        </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    )
}