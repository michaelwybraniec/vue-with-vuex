import PeopleComponent from "@/views/people.vue"; // Parent
import PersonDetailComponent from "@/views/person-detail.vue"; // Child
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
require("jsdom-global")(); // in test setup / entry

shallowMount(PeopleComponent, {
  localVue,
  router
});

describe("PeopleComponent", () => {
  it("renders a div", () => {
    const wrapper = mount(PeopleComponent);
    expect(wrapper.contains("div")).toBe(true);
  });
  test("is a Vue instance", () => {
    const wrapper = mount(PeopleComponent);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
