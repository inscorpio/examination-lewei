<template>
	<el-container>
		<el-card style="width: 100%;">
			<template #header>
				<div class="query-header">
					<el-input v-model="querys.userName" placeholder="请输入用户姓名" clearable style="width: 400px;" @change="handQuery">
						<el-button class="query" slot="append" type="primary" icon="el-icon-search" @click="handQuery">搜索</el-button>
					</el-input>
					<el-button class="add" type="primary" icon="el-icon-plus" @click="handleEdit()">新增</el-button>
				</div>
			</template>
			<el-table :data="tableList" style="width: 100%;">
				<el-table-column prop="userName" label="姓名" min-width="200"></el-table-column>
				<el-table-column prop="age" label="年龄" width="200" :formatter="(row) => row.age || '未知'"></el-table-column>
				<el-table-column prop="sex" label="性别" width="200" :formatter="handleSex"></el-table-column>
				<el-table-column label="操作" width="width">
					<template #default="{ row }">
						<el-button class="edit" type="primary" @click="handleEdit(row.id)">修改</el-button>
						<el-button class="remove" type="danger" @click="promptRemove(row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<user-edit :visible.sync="userEditVisible" :id="userId" @save-success="loadData"></user-edit>
	</el-container>
</template>

<script>
import { getSession, setSession } from '@/utils/sessionStorage.js'
import { USER_KEY } from '@/utils/config.js'
import UserEdit from './UserEdit.vue'
export default {
	name: 'UserList',
	components: {
		UserEdit,
	},
	data() {
		return {
			userId: undefined,
			userEditVisible: false,
			tableList: [],
			querys: {
				userName: '',
			},
			sexList: [
				{
					name: '男',
					value: 1,
				},
				{
					name: '女',
					value: 0,
				},
			],
		}
	},
	created() {
		!getSession(USER_KEY) && this.handleInit()
		this.loadData()
	},
	methods: {
		handQuery() {
			this.tableList = getSession(USER_KEY).filter(item => item.userName.match(this.querys.userName))
		},
		handleInit() {
			const dataList = [
				{
					id: 1,
					userName: '张三',
					age: 20,
					sex: 1,
				},
				{
					id: 2,
					userName: '李四',
					age: 22,
					sex: 0,
				},
				{
					id: 3,
					userName: '张全蛋',
					age: 32,
					sex: 1,
				},
			]
			setSession(USER_KEY, dataList)
		},
		handleEdit(id) {
			this.userId = id
			this.userEditVisible = true
		},
		promptRemove(id) {
			this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.handleRemove(id)
			}).catch(() => {})
		},
		handleRemove(id) {
			const index = this.tableList.findIndex(item => item.id === id)
			this.tableList.splice(index, 1)
			setSession(USER_KEY, this.tableList)
			this.$message({
				type: 'success',
				message: '删除成功!'
			})
		},
		handleSex(row) {
			return this.sexList.find(item => item.value === row.sex)?.name ?? '未知'
		},
		loadData() {
			this.tableList = getSession(USER_KEY)
		},

	},
}
</script>

<style lang="scss" scoped>
.el-container {
	width: 1080px;
	height: 100vh;
	margin: 0 auto;
}
.query-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>