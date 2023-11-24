import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { logout, login, edit, tick, cross } from '../../assets/Icons'
import { menuItems } from './menuItems'
import { useGlobalContext } from '../../context/globalContext'

function Navigation({ active, setActive }) {
    
    const globalContext = useGlobalContext();
    const [balance, setBalance] = useState(0);
    const [editBalance, setEditBalance] = useState(false);

    const balanceHandler = () => {
        if(balance!==globalContext.profile.balance)
            globalContext.updateBalance(balance);
        setEditBalance(false);
    }

    useEffect(() => {
        if(globalContext.profile)
            setBalance(globalContext.profile.balance);
    }, [globalContext.profile]);
    
    return (
        <NavStyled>
            {globalContext.loggedIn ?
                (
                    <div className="user-con">
                        <img src={globalContext.profile.profile_picture_url} alt="" />
                        <div className="text">
                            <h3>{globalContext.profile.name}</h3>
                            {editBalance ?
                                (
                                    <BalanceDiv>
                                        Balance: <input type="number" value={balance} onChange={(e)=>setBalance(e.target.value)} />
                                        <EditButton onClick={balanceHandler}>{tick}</EditButton>
                                        <EditButton onClick={() => setEditBalance(false)}>{cross}</EditButton>
                                    </BalanceDiv>
                                ) :
                                (
                                    <BalanceDiv>
                                        Balance: {globalContext.profile.balance}/-
                                        <EditButton onClick={() => setEditBalance(true)}>{edit}</EditButton>
                                    </BalanceDiv>
                                )
                            }
                        </div>
                    </div>
                ) :
                (
                    <div className="user-con">
                        <img src="#" alt="" />
                        <div className="text">
                            <h2>John Doe</h2>
                            <p>Balance: 0/-</p>
                        </div>
                    </div>
                )
            }
            {globalContext.loggedIn ?
                (
                    <ul className="menu-items">
                        {menuItems.map((item) => {
                            return <li
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={active === item.id ? 'active': ''}
                            >   <Link to={item.link}>{item.icon}</Link>
                                <LinkStyled to={item.link}>{item.title}</LinkStyled>
                            </li>
                            })}
                    </ul>
                ) :
                (
                    <ul className="menu-items">
                        <li
                            key={menuItems[0].id}
                                onClick={() => setActive(menuItems[0].id)}
                                className={active === menuItems[0].id ? 'active': ''}
                            >   <Link to={menuItems[0].link}>{menuItems[0].icon}</Link>
                                <LinkStyled to={menuItems[0].link}>{menuItems[0].title}</LinkStyled>
                        </li>
                    </ul>
                )
            }
            
            
            {globalContext.loggedIn ?
                (
                    <BottomNav onClick={globalContext.logout} className="bottom-nav">
                        <div >
                            {logout} Sign Out
                        </div>
                    </BottomNav>
                ) :
                (
                    <BottomNav onClick={globalContext.login} className="bottom-nav">
                        <div >
                            {login} Sign In
                        </div>
                    </BottomNav>
                )
            }
        </NavStyled>
    )
}

const EditButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .4s ease-in-out;
    &:hover{
        background: #FFFFFF;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        transform: scale(1.1);
    }
`;

const BalanceDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    input{
        width: 80px;
        height: 30px;
        border-radius: 10px;
        border: 4px solid #FFFFFF;
        background: rgba(252, 246, 249, 0.78);
        backdrop-filter: blur(4.5px);
        padding: 0 0.2rem;
        color: rgba(34, 34, 96, 1);
        font-size: 1.2rem;
        outline: none;
    }
`;

const BottomNav = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    background: rgba(34, 34, 96, 0.06);
    color: rgba(34, 34, 96, 0.6);
    cursor: pointer;
    transition: all .4s ease-in-out;
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 30%;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h3{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation