<template>
	<el-dialog title="编辑用户信息" :visible.sync="visible" width="650px" :before-close="handleBeforeClose" :close-on-click-modal="false">
		<el-form ref="form" :model="userInfo" :rules="rules" label-width="55px">
			<el-form-item label="姓名: " prop="userName">
				<el-input v-model="userInfo.userName" placeholder="请输入用户姓名"></el-input>
			</el-form-item>
			<el-form-item label="年龄: " prop="age">
				<el-input-number v-model="userInfo.age" placeholder="请输入年龄"></el-input-number>
			</el-form-item>
			<el-form-item label="性别: " prop="sex">
				<el-radio-group v-model="userInfo.sex">
					<el-radio :label="1">男</el-radio>
					<el-radio :label="0">女</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button class="cancel" @click="$emit('update:visible', false)">取 消</el-button>
			<el-button class="submit" type="primary" @click="handleSubmit">保 存</el-button> 
		</div>
	</el-dialog>
</template>

<script>
import { getSession, setSession } from '@/utils/sessionStorage.js'
import { USER_KEY } from '@/utils/config.js'
import handleFormInfo from '@/utils/handleFormInfo.js'

export default {
	name: 'UserEdit',
	props: {
		visible: Boolean,
		id: Number,
	},
	data() {
		return {
			userInfo: {
				id: null,
				userName: null,
				age: null,
				sex: null,
			},
			rules: {
				userName: [
					{ required: true, message: '请填写用户姓名', trigger: 'blur' }
				],
				age: [
					{ type: 'number', min: 0, message: '请填写正确的年龄', trigger: 'blur' }
				],
			}
		}
	},
	watch: {
		visible(val) {
			if (val) {
				const userList = getSession(USER_KEY) ?? []
				const userInfo = userList.find(item => item.id === this.id)
				if (!this.id) {
					// 新增
					for (let key in this.userInfo) {
						this.userInfo[key] = null
					}
				} else {
					// 修改
					userInfo && handleFormInfo(this.userInfo, userInfo)
				}
			}
		}
	},
	methods: {
		handleBeforeClose() {
			return this.$emit('update:visible', false)
		},
		// 提交验证
		handleSubmit() {
			this.$refs['form'].validate(valid => valid && this.handleSave())
		},
		// 保存
		handleSave() {
			const userList = getSession(USER_KEY) ?? []
			if (!this.id) {
				// 新增
				this.userInfo.id = Date.now()
				userList.push(this.userInfo)
			} else {
				// 修改
				userList.forEach(item => item.id === this.id && handleFormInfo(item, this.userInfo))
			}
			setSession(USER_KEY, userList)
			this.$emit('save-success')
			this.$emit('update:visible', false)
		}
	},
}
</script>