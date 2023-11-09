

export interface ProductPage {
    content: ProductPageContent[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    first: boolean
    numberOfElements: number
    size: number
    number: number
    sort: Sort2
    empty: boolean
  }
  
  export interface ProductPageContent {
    id: string
    name: string
    typeId: string
    typeName: string
    salePrice: number
    purchasePrice: number
    supplierId: string
    details: string
    userCreationId: string
    userUpdateId: string
    creationDate: string
    updateDate: string
  }
  
  export interface Pageable {
    sort: Sort
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  
  export interface Sort {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  
  export interface Sort2 {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  