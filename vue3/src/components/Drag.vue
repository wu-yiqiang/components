<template>
	<section class='Drag'>
		<!-- <div class="pannel">
		</div> -->
		<div class="process-area">
			<div class="process-item">
				<div class="title">LOG</div>
				<div data-drop="true" class="pannels">
					<Card v-for="(item, index) in lists1" :key="index" :target="item" :status="1" />
				</div>
			</div>
			<div class="process-item">
				<div class="title">IN PROCESS</div>
				<div data-drop="true" data-process="2" class="pannels">
					<Card v-for="(item, index) in lists2" :key="index" :target="item"  :status="2" />
				</div>
			</div>
			<div class="process-item">
				<div class="title">PENDING</div>
				<div data-drop="true" data-process="3" class="pannels">
					<Card v-for="(item, index) in lists3" :key="index" :target="item" :status="3" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import Avatar from '@/assets/imgs/avatar-default.jpg'
import Card from './card.vue'
const lists1 = ref([
	{ code: 490, avatar: Avatar, contents: "【测试数据】【BACKEND】E-inspection；当前部门没有数据，配置了也没有数据【测试数据】【BACKEND】E-inspection；当前部门没有数据，配置了也没有数据【测试数据】【BACKEND】E-inspection；当前部门没有数据，配置了也没有数据", date: '2025-11-24', status: 'pendding', process: 1 },
	{ code: 491, avatar: Avatar, contents: "【测试数据】【BACKEND】E-inspection；当前部门没有数据，配置了也没有数据", date: '2025-11-93', status: 'pendding', process: 1 },
	{ code: 450, avatar: Avatar, contents: "【测试数据】【BACKEND】E-inspection；查询列表报错，显示系统繁忙", date: '2023-01-10', status: 'closed', process: 1 },
	{ code: 433, avatar: Avatar, contents: "【测试数据】【BACKEND】E-inspection；没有返回已修改的数据", date: '2002-02-02', status: 'fixed', process: 1 },
	{ code: 229, avatar: Avatar, contents: "【测试数据】【BACKEND】E-inspection；查询详情失败，返回数据错误", date: '2023-05-12', status: 'closed', process: 1 },
	{ code: 500, avatar: Avatar, contents: "【测试数据】【BACKEND】E-inspection；显示查询岗位信息，显示岗位信息不存在", date: '2024-06-06', status: 'pendding', process: 1 },
])
let lists2 = ref([])
let lists3 = ref([])
let source = null
let sourcePannel = ref(null)
let sourceIndex = ref(null)
let targetPannel = ref(null)
let targetIndex = ref(null)
const handleClearAllStayle = () => {
	document.querySelectorAll(".pannels").forEach((node) => {
		node?.classList.remove('drop-over')
	})
}

const handleClearAllMovingStayle = () => {
	document.querySelectorAll(".pannel-item").forEach((node) => {
		node?.classList.remove('moving')
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
		handleClearAllMovingStayle()
		setTimeout(() => {
			e.target.classList.add('moving')
		}, 0)
	})
	element.addEventListener("dragenter", (e: Event) => {
		handleClearAllStayle()
		const node = getDropNode(e.target)
		node && node.classList.add('drop-over')
		console.log("target", node)
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
			// 将数据状态变化
		}
		handleClearAllMovingStayle()
	})
	addEventListener("dragend", (e: Event) => {
		handleClearAllStayle()
		handleClearAllMovingStayle()
	})
})
</script>
<style scoped lang='scss'>
$--item-width: 260px;
$--item-height: 150px;
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



				.moving {
					opacity: 0;
				}
			}

			.drop-over {
				background-color: grey;
			}

		}
	}
}
</style>