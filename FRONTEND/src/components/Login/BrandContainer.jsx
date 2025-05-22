import React from 'react'
import styles from './BrandContainer.module.css'

function BrandContainer() {
  return (
    <div className={styles.brandContainer}>
      <div className={styles.brandLogo}>
         <p>the world number online shooping platform <strong>TRADENEST</strong> </p>
      </div>
       <p className={styles.brandSite}>www.TRADENEST.com</p>
    </div>
  )
}

export default BrandContainer
