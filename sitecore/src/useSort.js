import { useState } from 'react'

const useSort = (sortedField , isDescending = true) => {
    const [ isDescending, setisDescending ] = useState(isDescending)
    const [sortedField, setSortedField] = useState(null);
	return {
		isDescending,
		order: () => {
			setisDescending((isDescending) => !isDescending)
        },
        sort : () => {

        }
	}
}

export default function mergeSortedInAssetList(list) {
    
    
}

export default useSort