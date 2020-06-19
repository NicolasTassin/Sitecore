import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { getAssetsByCollectionAsync } from '../data'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const AssetContainer = styled.div`
    width:470px;

    .table tr td {
        vertical-align: middle !important;
    }
    `

const Assets = ({ collectionSelected, setMainAsset, mainAsset }) => {
    const [assetList, setAssetList] = useState([])
    const [sortedList, setSortedList] = useState()

    useEffect(() => {
            getAssetsByCollectionAsync(collectionSelected)
            .then(data => {
                setAssetList(data)
            })

    }, [collectionSelected])

    const sortArrayByName = (type) => {     
        const sorted = assetList.sort((a, b) =>  b[type] < a[type] ? 1 : -1  )

        setSortedList(sorted);
    }  

    const sortArrayById = (value) => {
        const sortedById = value.sort((a, b ) => a.id > b.id ? 1 : -1 )

        setSortedList(sortedById === sortedList)
    }

    return (
        <AssetContainer>
            <h1>Champions</h1>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => sortArrayById(assetList)}>Sort by Id</Dropdown.Item>
                    <Dropdown.Item onClick={() => sortArrayByName('name')}>Sort by name</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Master</th>
                    </tr>
                </thead>
                <tbody>
                { assetList && assetList.map((elem, index) => (

                    <tr key={index} >
                        <td>
                            <img src={`/images/${elem.path}`} width={"150px"} alt=''></img>
                        </td>
                        <td>{ elem.id }</td>
                        <td>{ elem.name }</td>
                        <td>{ mainAsset[collectionSelected - 1] === elem.id && <i className="fas fa-crown fa-2x"></i> }

                        { mainAsset[collectionSelected - 1] !== elem.id && 
                            <Button 
                                variant="warning" 
                                onClick={() => setMainAsset(elem.id, collectionSelected - 1)}> Select
                            </Button> }
                        </td>
                    </tr>
                )) }
                </tbody>
            </Table>
        </AssetContainer>
    )
}


export default Assets;