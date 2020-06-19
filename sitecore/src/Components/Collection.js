import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { getCollectionsAsync, getAssetsAsync, getAssetsByCollectionAsync } from '../data'
import Asset from './Assets'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'


const MainContainer = styled.div`
    width: 70%;
    display:flex;
    justify-content:space-between;
    .collection{
        height:260px;
        width:600px !important;
        display:flex;
        border-radius: 5px;
        box-shadow:2px 2px 2px gray;
        :hover{
            cursor: pointer;
            box-shadow:none;
            transform:translateX(-10px);
            
            
        }
        .infos{
            text-align:left;
            width:100%;
            margin-left:5%;
            span{
                margin:1%;
            }
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
    const [assetsListColl, setAssetListColl] = useState([])
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
        
        getAssetsByCollectionAsync(collectionSelected)
            .then(data => {
                setAssetListColl(data)
            })

    }, [collectionSelected])

    const changeMasterAssetInCollection = (newAsset, indexCollection) => {
        let newArray = { ...mainAsset }
        newArray[indexCollection] = newAsset

        setMainAsset(newArray)
    }

    function handleClick(index) {
        setCollectionSelected(index + 1)
    }

    const CollectionItem = collectionList.length && collectionList.map((elem, index) => (
        <ListGroup.Item key={index} onClick={() => handleClick(index)} className='collection mt-3'>
            <img src={`/images/${assetsList.length &&
                assetsList.find((a) => a.id === mainAsset[index]).path}`} alt=''>
            </img>
            <div className="infos">
                <h1>{elem.name}</h1>
                <Badge pill variant="warning">
                    {elem.tags.name}
                </Badge>
                <Badge pill variant="success">
                    {elem.tags.subTag.name}
                </Badge>
                <Badge pill variant="secondary">
                    {elem.tags.subTag.subTag && elem.tags.subTag.subTag.name}
                </Badge>
            </div>
        </ListGroup.Item>
    ))

    return (
        <MainContainer>
            <CollectionContainer>
                <h1>Teams</h1>
                <ListGroup>{CollectionItem}</ListGroup>
            </CollectionContainer>
            <Asset
                collectionSelected={collectionSelected}
                collectionList={collectionList}
                mainAsset={mainAsset}
                setMainAsset={changeMasterAssetInCollection}
                assetList={assetsListColl} />
        </MainContainer>
    )
}


export default Collection;