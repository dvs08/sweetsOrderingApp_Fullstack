import React from 'react';
import { useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';

const Header = ({ title = 'some Default' }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReturn = () => {
        
        
    dispatch({
        type: 'RESET_ITEM_QUEUE2',
    });

    
    navigate('/');
};

const handleHome = () => {

        dispatch({

            type: 'RESET_ITEM_QUEUE',
        });
        navigate('/mithaiwala');

};

  
  return(

    <div>
         <div className="logout">
                <button className='returnB' onClick={handleHome}>Home</button>
                <button className='returnB' onClick={handleReturn}>LogOut</button>
        </div>
        <div className="container">
            <h1 className="header__title">{title}</h1>
        </div>

    </div>

  );
};

export default Header;


