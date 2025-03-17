<template>
	<section class='Drag'>
		<!-- <div class="pannel">
		</div> -->
		<div class="process-area">
			<div class="process-item">
				<div class="title">LOG</div>
				<div data-drop="true" class="pannels">
					<div data-effect="copy" draggable="true" class="pannel-item">功能1</div>
					<div data-effect="copy" draggable="true" class="pannel-item">功能2</div>
					<div data-effect="copy" draggable="true" class="pannel-item">功能3</div>
					<div data-effect="copy" draggable="true" class="pannel-item">功能4</div>
					<div data-effect="copy" draggable="true" class="pannel-item">功能5</div>
					<div data-effect="copy" draggable="true" class="pannel-item">功能6</div>
				</div>
			</div>
			<div class="process-item">
				<div class="title">IN PROCESS</div>
				<div data-drop="true" class="pannels"></div>
			</div>
			<div class="process-item">
				<div class="title">PENDING</div>
				<div data-drop="true" class="pannels"></div>
			</div>
		</div>
	</section>
</template>

<script setup lang='ts'>
let source = null
const handleClearAllStayle = () => {
	document.querySelectorAll(".pannels").forEach((node) => {
			node?.classList.remove('drop-over')
	})
}
const getDropNode = (node: any) => {
	while (node) {
		if (node?.dataset?.drop) {
				return node
		}
			node = node.parentNode
	}
}
onMounted(() => {
	const element = document.querySelector('.Drag')
	element.addEventListener("dragstart", (e: Event) => {
		e.dataTransfer.effectAllowed = e.target?.dataset?.effect
		source = e?.target
		console.log("dragentart", e.target)
	})
	element.addEventListener("dragenter", (e: Event) => {
		handleClearAllStayle()
		e.target.classList.add('drop-over')
		// console.log("dragenter", e.target)
	})
	// addEventListener("dragleave", (e:Event) => {
	// 	console.log("dragleave", e.target)
	// })
	element.addEventListener("dragover", (e: Event) => {
		e?.preventDefault && e?.preventDefault()
		// console.log("dragover", e.target)
	})
	element.addEventListener("drop", (e: Event) => {
		const dropNode = getDropNode(e?.target)
		if (dropNode) {
			const cloneNode = source.cloneNode(true)
			dropNode.appendChild(cloneNode)
			source.remove()
			handleClearAllStayle()
		}
		console.log("drop", e.target)
	})
	// addEventListener("dragend", (e:Event) => {
	// 	console.log("dragend", e.target)
	// })
})
</script>
<style scoped lang='scss'>
$--item-width: 160px;

.Drag {
	display: flex;
	column-gap: 20px;
	background-color: #fff;
	padding: 10px;
	border-radius: 4px;

	// .pannel {
	// 	background-color: rgb(221, 220, 220);
	// 	padding: 10px;
	// 	border-radius: 2px;
	// 	display: grid;
	// 	row-gap: 10px;
	// 	.pannel-item {
	// 		height: 50px;
	// 		width: 100px;
	// 		display: grid;
	// 		place-content: center;
	// 		border-radius: 2px;
	// 		background-color: aliceblue;
	// 	}
	// }
	.process-area {
		display: flex;
		column-gap: 10px;
		flex: 1;

		.process-item {
			display: flex;
			flex-direction: column;

			.title {
				font-size: 16px;
				margin-bottom: 10px;
				color: #030303;
			}

			.pannels {
				flex: 1;
				background-color: #f4f5f7;
				min-width: $--item-width;
				border-radius: 2px;
				padding: 4px;
				display: flex;
				flex-direction: column;
				row-gap: 6px;
				.pannel-item {
					height: $--item-width;
					width: $--item-width;
					display: grid;
					place-content: center;
					background-color: #fff;
					border-radius: 4px;
					color: #030303;
				}
			}

			.drop-over {
				background-color: grey;
			}
		}
	}
}
</style>