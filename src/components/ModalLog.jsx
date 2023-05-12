import React, { memo } from 'react'

const ModalLog = memo(({children, visibleModal, setVisibleModal}) => {
    
    const classModal = ['hidden ']
// useEffect (() => {
    if (visibleModal) {
        console.log('класс')
        classModal.push('modal-log-container')
    } 
// }, [visibleModal, setVisibleModal])

  return (
    <div className={classModal.join(' ')}>{children}</div>
  )
})

export default ModalLog