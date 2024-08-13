<template>
	<AppPage show-footer>
		<div class="mt-12 flex">
			<n-card
				class="ml-12 w-50% h-500px"
				title="技术栈"
				segmented
			>
				<VChart
					:option="skillOption"
					autoresize
				/>
			</n-card>
		</div>
	</AppPage>
</template>

<script setup>
	import * as echarts from 'echarts/core'
	import {
		GridComponent,
		LegendComponent,
		TooltipComponent
	} from 'echarts/components'
	import { BarChart, LineChart, PieChart } from 'echarts/charts'
	import { UniversalTransition } from 'echarts/features'
	import { CanvasRenderer } from 'echarts/renderers'
	import VChart from 'vue-echarts'
	import { useUserStore } from '@/store'

	const userStore = useUserStore()

	echarts.use([
		TooltipComponent,
		GridComponent,
		LegendComponent,
		BarChart,
		LineChart,
		CanvasRenderer,
		UniversalTransition,
		PieChart
	])

	const skillOption = {
		tooltip: {
			trigger: 'item',
			formatter({ name, value }) {
				return `${name} ${value}%`
			}
		},
		legend: {
			left: 'center'
		},
		series: [
			{
				top: '12%',
				type: 'pie',
				radius: ['35%', '90%'],
				avoidLabelOverlap: true,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 36,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: [
					{ value: 38.5, name: 'Vue3' },
					{ value: 37.0, name: 'JavaScript' },
					{ value: 6.5, name: 'CSS' },
					{ value: 6.2, name: 'HTML' },
					{ value: 1.8, name: 'Other' }
				]
			}
		]
	}
</script>
