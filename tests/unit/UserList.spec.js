import { mount } from '@vue/test-utils'
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import UserList from '@/components/UserList.vue'

describe('UserList.vue', () => {
	const wrapper = mount(UserList)
	it('列表数据 ', () => {
		expect(Array.isArray(wrapper.vm.tableList)).toBe(true)
		expect(wrapper.vm.tableList.length).toBeGreaterThanOrEqual(0)
	})
	it('新增按钮', () => {
		wrapper.find('.add').trigger('click')
		expect(wrapper.vm.userId).toBeUndefined()
		expect(wrapper.vm.userEditVisible).toBe(true)
	})
	it('修改按钮', () => {
		wrapper.find('.edit').trigger('click')
		expect(typeof wrapper.vm.userId).toBe('number')
		expect(wrapper.vm.userEditVisible).toBe(true)
	})
	it('删除功能', () => {
		const tableListLen = wrapper.vm.tableList.length
		wrapper.vm.handleRemove(wrapper.vm.tableList[0].id)
		expect(wrapper.vm.tableList.length).toBeLessThan(tableListLen)
	})
	it('搜索 ', () => {
		const oleDataList = wrapper.vm.tableList
		const userName = '张'
		wrapper.setData({
			querys: { userName },
		})
		wrapper.find('.query').trigger('click')
		expect(wrapper.vm.tableList.length).toBeLessThanOrEqual(oleDataList.length)
		expect(wrapper.vm.tableList[0].userName).toContain(userName)
	})
})
