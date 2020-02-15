import React from 'react';

const Search = (props) => {
    return (
        <div className="search_condition">
            <Tixing list={props.list} funt={props.funt}></Tixing>
        </div>
    )
}

const Tixing = (props) => {
    const l1 = props.list
    const changeitemId = (e,index)=>{
        props.funt(e,index)
    }
    return (
        <div className="type">
            {
                l1.map((ele,index) =>
                    <div key={index}>
                        <div className="title">{ele.name}</div>
                        <ul className="item_wrapper">
                            {ele.list.map((res) =>
                                <li className={ele.h === res.id?'item active':'item'} key={res.id} onClick={()=>changeitemId(res.id,index)}>
                                    {res.title}
                                </li>
                            )}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
export default Search