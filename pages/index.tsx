import { NextPage } from 'next'
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import styled from "styled-components";
import dynamic from 'next/dynamic';

const IndexContainer = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: transparent;
	display: flex;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 3;
	position: relative;
	pointer-events: none;
	justify-content: center;
	align-items: center;
	justify-items: center;
`

const ResumeLayoutDiv = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: transparent;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 3;
	position: relative;
	pointer-events: none;
	font-size: 1.6rem;
`

const HeaderContainer = styled.div<{ color: string }>`
	height: 8rem;
	width: 100%;
	background-color: transparent;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	wrap: nowrap;
	z-index: 3;
	position: relative;
	pointer-events: none;
	border: 1px solid ${(props) => (props.color)};
	* {
		pointer-events: auto;
	}
`

const HeaderRight = styled.div`
	justify-items: flex-start;
	height: 100%;
	width: 50%;
	display: flex;
	justify-content: flex-start;
	flex-wrap: nowrap;
	flex-direction: row;
	align-items: center;
`
const HeaderMiddle = styled.div` `
const HeaderLeft = styled.div` `

const MainContainer = styled.div<{ color: string }>`
	height: calc(100% - 12rem);
	width: 100%;
	background-color: transparent;
	display: flex;
	flex-direction: row;
	wrap: nowrap;
	overflow: hidden;
	z-index: 3;
	position: relative;
	pointer-events: none;
	border: 1px solid ${(props) => (props.color)};

	* {
		pointer-events: auto;
	}
`

const MainArea = styled.div` `
const MainLeft = styled.div` `

const NavBarContainer = styled.div<{ color: string }>`
	height: 4rem;
	width: 100%;
	background-color: transparent;
	flex-direction: row;
	display: flex;
	wrap: nowrap;
	overflow: hidden;
	z-index: 3;
	position: relative;
	pointer-events: none;
	border: 1px solid ${(props) => (props.color)};

	* {
		pointer-events: auto:
	}
`
const NavBarLeft = styled.div` `
const NavBarRight = styled.div` `



const IndexPage: NextPage = () => {

	const txt = "#000"

	const {
		NameAnimationMotion,
		GridAnimation,
	} = {
		NameAnimationMotion: dynamic(() => import('../components/NameAnimation'), { ssr: false }),
		GridAnimation: dynamic(() => import('../components/GridAnimation'), { ssr: false }),
	}

	const { scrollYProgress } = useScroll();

	const yTransform = useTransform(
		scrollYProgress,
		// Map x from these values:
		[0, 1],
		// Into these values:
		['0rem', '9rem']
	)

	const xTransform = useTransform(
		scrollYProgress,
		// Map x from these values:
		[0, 1],
		// Into these values:
		['0rem', '-26rem']
	)

	const zTransform = useTransform(
		scrollYProgress,
		// Map x from these values:
		[0, 1],
		// Into these values:
		['0px', '100px']
	)

	const heightTransform = useTransform(
		scrollYProgress,
		// Map x from these values:
		[0, 1],
		// Into these values:
		['100vh', '0vh']
	)

	const widthTransform = useTransform(
		scrollYProgress,
		// Map x from these values:
		[0, 1],
		// Into these values:
		['100vw', '0wh']
	)

	const zIndexTransform = useTransform(
		scrollYProgress,
		// Map x from these values:
		[0, 1],
		// Into these values:
		[4, 10]
	)

	const scaler = useTransform(
		scrollYProgress,
		// Map x from these values:
		[0, 1],
		// Into these values:
		[1, 0.7]
	)

	// const template = ({ x }) => {
	// 	return `translateY(${x})`
	// }

	useEffect(() => {
		return yTransform.onChange((latest) => {
			console.log("Page scroll: ", latest)
		})
	}, [scrollYProgress, yTransform, NameAnimationMotion])

	return (
		<>
			<main>

				<GridAnimation />


				<motion.div style={{
					translateY: yTransform,
					translateX: xTransform,
					translateZ: zTransform,
					zIndex: zIndexTransform,
					minHeight: heightTransform,
					minWidth: widthTransform,
					scale: scaler,
					backgroundColor: 'transparent',
					display: 'flex',
					overflowX: 'hidden',
					overflowY: 'auto',
					position: 'relative',
					pointerEvents: 'none',
					alignContent: 'center',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}>
					<NameAnimationMotion />
				</motion.div>


				<ResumeLayoutDiv style={{ color: txt }}>
					<HeaderContainer color={txt}>
						<HeaderRight>
						</HeaderRight>
						<HeaderMiddle>
						</HeaderMiddle>
						<HeaderLeft>
						</HeaderLeft>
					</HeaderContainer>
					<MainContainer color={txt}>
						<MainArea>
						</MainArea>
						<MainLeft>
						</MainLeft>
					</MainContainer>
					<NavBarContainer color={txt}>
						<NavBarLeft>
							<SlArrowLeft />
						</NavBarLeft>
						<NavBarRight>
							<SlArrowRight />
						</NavBarRight>
					</NavBarContainer>
				</ResumeLayoutDiv>
			</main>
		</>
	)
}

export default IndexPage
