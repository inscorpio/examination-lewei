import { mount } from '@vue/test-utils'
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import UserEdit from '@/components/UserEdit.vue'

describe('UserEdit.vue', () => {
	const visible = true
	const wrapper = mount(UserEdit, {
		propsData: { visible }
	})
	it('显示 ', () => {
		expect(wrapper.vm.visible).toBe(true)
	})
	it('取消 ', () => {
		wrapper.find('.cancel').trigger('click')
		expect(wrapper.emitted()['update:visible']).toBeTruthy()
	})
	it('保存 ', () => {
		wrapper.setData({
			userInfo: {
				userName: '赵六'
			}
		})
		wrapper.vm.handleSave()
		expect(wrapper.vm.userInfo.id).toBeTruthy()
		expect(wrapper.emitted()['save-success']).toBeTruthy()
		expect(wrapper.emitted()['update:visible']).toBeTruthy()
	})
})
