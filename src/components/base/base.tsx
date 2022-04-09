import styled from 'styled-components'
import { BorderRad, Colors, Gradients, Shadows, Sizes } from '../../global/styles'
import { Title } from '../../typography/Title'

export const Page = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: ${Sizes.headerHeight};
  height: 100%;
  min-height: 100vh;
  background-color: ghostwhite;
`

export const ContainerCustom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  padding-right: 14px;
`

// token page 

export const ContainerCustomTokenListSections = styled.div`
  display: flex;
  justify-content: flex-start;
  max-height: 700px;
  flex-wrap: wrap-reverse;
`
export const ItemSelectionSection = styled.section`
  flex-direction: column;
  flex:1;
  margin:1em;
  margin-left:0.5em;
`

// export const ItemSelectionSection = styled.section`
//   position: relative;
//   flex-direction: column;
//   flex:1;
//   margin:1em;
//   margin-left:0.5em;
// `


export const SignedOutContainer = styled.div`
display: flex;
jusrifyContent: center;
  margin-bottom: 1em;
`

export const ItemListSection = styled.section`
  margin:1em;
  margin-right:0.5em;
  flex-direction: column;
  flex:2;
  border-color: black;
  border-width: 1px;
`

// export const ItemListSection = styled.section`
//   margin:1em;
//   margin-right:0.5em;
//   position: relative;
//   flex-direction: column;
//   flex:2;
// `

export const HeaderContainer = styled(ContainerCustom)`
  max-width: 1200px;
`

// export const MainContent = styled.main`
//   display: flex;
//   position: relative;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   min-height: calc(100vh - ${Sizes.headerHeight});
//   overflow: scroll;

//   &:before {
//     content: '';
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     overflow: hidden;
//     pointer-events: none;
//     user-select: none;
//     background-color: ghostwhite;
//   }
// `

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: scroll;
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    background-color: ghostwhite;
  }
`

// export const Section = styled.section`
//   display: flex;
//   position: relative;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   margin-top: 24px;
//   margin-bottom: 60px;
// `



export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 24px;
  margin-bottom: 60px;
`

export const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 3em;

  ${Title} {
    margin-bottom: 0;
  }
`

export const SectionRowAvatar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 3.4em;
`

export const DomainSelectBoxContainer = styled.div`
  flex-grow: 1;
`

export const DomainTitleContainer = styled.div`
  flex-grow: 3;
`

export const ContentRow = styled.div`
  display: block;

  & + & {
    margin-top: 16px;
  }
`

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgb(223 232 241);;
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.main};
  padding: 10px;
`

export const ContentBlockBackground = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 800px;
  min-height: 1000px;
  background-color: #efeeee; 
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.main};
  padding: 10px;
`
// #c4d9ef