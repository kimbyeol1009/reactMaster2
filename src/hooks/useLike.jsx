import {useState} from 'react'

function useLike(){
     let [like, setLike] = useState(0);
        function addLike(){
            setLike(like+1)
        }
        return [like, addLike];
}

export default useLike;