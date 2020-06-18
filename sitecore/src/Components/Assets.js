import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { getAssetsByCollectionAsync } from '../data'



const AssetContainer = styled.div`
    .one{
        border: 2px red solid;
    }
    .two{
        
    }


`



const Assets = ({ collectionSelected, setMainAsset, mainAsset }) => {
    const [AssetList, setAssetList] = useState([])

    

    useEffect(() => {
        getAssetsByCollectionAsync(collectionSelected)
            .then(data => {
                setAssetList(data)
            })

    }, [collectionSelected])

    




    return (
        <AssetContainer>
            <h1>Assets</h1>
            <ul>
                {AssetList && AssetList.map((elem, index) => (

                    <li key={index}

                        className={mainAsset[collectionSelected - 1] === elem.id ? "one" : "two"}
                        
                    >
                        {console.log(collectionSelected-1, "collectionSelected")}
                        <img src={`/images/${elem.path}`} width={"100px"} alt=''></img>
                        {mainAsset[collectionSelected - 1] === elem.id && <div>master</div>}
                        {mainAsset[collectionSelected - 1] !== elem.id && <button onClick={() => setMainAsset(elem.id, collectionSelected - 1)}>Make Master</button>}
                    </li>
                ))}
            </ul>
        </AssetContainer>
    )
}


export default Assets;