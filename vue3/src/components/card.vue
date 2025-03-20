<template>
	<div v-if="status == target?.process" data-effect="copy" draggable="true" class="pannel-item">
		<div draggable="false" class="main-box">
			<div draggable="false" class="left-box">
				<div draggable="false" class="index">{{ target?.code }}</div>
				<div draggable="false" class="contents">
					{{ target?.contents }}
				</div>
			</div>
			<div draggable="false" class="right-box">
				<img draggable="false" :src="target?.avatar" alt="">
			</div>
		</div>
		<div draggable="false" class="bottom-box">
			<div draggable="false" class="date">{{ target?.date }}</div>
			<div draggable="false" class="status">
				<div draggable="false" :class="['check-box', target?.status]"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
const props = defineProps({
	target: {
		type: Object,
		required: true,
		default: () => { },
	},
	status: {
		type: Number,
		required: true,
		default: null,
	},
});
</script>
<style scoped lang='scss'>
$--item-width: 260px;
$--item-height: 150px;

.pannel-item {
	height: $--item-height;
	width: $--item-width;
	background-color: #fff;
	// box-shadow: 0 0 4px 1px grey;
	border-radius: 4px;
	color: #030303;
	display: flex;
	flex-direction: column;
	padding: 10px;

	.main-box {
		flex: 1;
		display: flex;
		justify-content: space-around;
		overflow: hidden;
		text-overflow: ellipsis;

		.left-box {
			font-size: 14px;
			font-weight: 500;
			flex: 1;
			display: flex;
			flex-direction: column;

			.index {}

			.contents {
				flex: 1;
				text-overflow: ellipsis;
			}
		}

		.right-box {
			img {
				width: 34px;
				height: 34px;
			}
		}
	}

	.bottom-box {
		.date {
			font-size: 14px;
		}

		.status {
			.check-box {
				height: 16px;
				width: 16px;
				border-radius: 2px;
			}

			.pendding {
				background-color: rgb(247, 208, 83);
			}

			.closed {
				background-color: rgb(221, 221, 221);
			}

			.fixed {
				background-color: rgb(79, 158, 248);
			}
		}
	}

}
</style>