import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { getCollectionsAsync, getAssetsAsync } from '../data'
import Asset from './Assets'


const MainContainer = styled.div`
    width: 70%;
    display:flex;
    justify-content:space-between;
    ul{
        list-style:none;
        display:flex;
        flex-direction:column;
        border:1px solid black;
        
        
        li{
            
        }
    }

`



const CollectionContainer = styled.div`
    display:flex;
    flex-direction:column;
      

`






const Collection = () => {
    const [collectionList, setCollectionList] = useState([])
    const [assetsList, setAssetsList] = useState([])
    const [collectionSelected, setCollectionSelected] = useState()
    const [mainAsset, setMainAsset] = useState(
        {
            0: 13,
            1: 24,
            2: 31,
            3: 42
        })



    useEffect(() => {
        getCollectionsAsync().then(data => {
            setCollectionList(data)
        })
        getAssetsAsync().then(data => {
            setAssetsList(data)
        })
        
    }, [])


    const changeMasterAssetInCollection = (newAsset, indexCollection) => {

        
        let newArray = {...mainAsset}
        newArray[indexCollection] = newAsset
        
        setMainAsset(newArray)


        


    }
    

    //     function appel(id) {
    //     getAssetByIdAsync(id).then(data => {
    //         console.log(data.path, "data path")
    //         setMasterAssetPath(oldArray => [...oldArray,data.path])
    //         console.log('/images/'+masterAssetPath, "laaaaaas---baaaaas")
    //     })
    // }


    function handleClick(index) {
        setCollectionSelected(index + 1)

    }

    const CollectionItem = collectionList.length && collectionList.map((elem, index) => (
        <li key={index} onClick={() => handleClick(index)} >
            <img src={`/images/${assetsList.length && assetsList.find((a) => a.id === mainAsset[index]).path}`} width={'100px'} alt=''></img>
            {elem.name}
            {elem.masterAssetId}
        </li>


    ))

    



    return (
        <MainContainer>
            <CollectionContainer>
                <h1>Collections</h1>
                <ul>{CollectionItem}</ul>
            </CollectionContainer>
            <Asset
                collectionSelected={collectionSelected}
                collectionList={collectionList}
                mainAsset={mainAsset}
                setMainAsset={changeMasterAssetInCollection} />
        </MainContainer>
    )
}


export default Collection;