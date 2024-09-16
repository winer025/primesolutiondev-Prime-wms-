<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="flex flex-col w-full h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-blue-900 text-white p-2 sm:p-4">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <div class="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
          <span class="font-bold text-sm sm:text-base">Home</span>
          <span class="text-xs sm:text-sm">PRIME SOLUTION WMS</span>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
          <button class="p-1 sm:p-2 rounded-full bg-blue-800">
            <BellIcon class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button class="p-1 sm:p-2 rounded-full bg-blue-800">
            <SettingsIcon class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div class="flex items-center space-x-1 sm:space-x-2">
            <UserIcon class="w-6 h-6 sm:w-8 sm:h-8 p-1 bg-blue-800 rounded-full" />
            <span class="text-xs sm:text-sm">Robert Patinson</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow p-2 sm:p-4 md:p-6 overflow-y-auto">
      <!-- Search Bar -->
      <div class="w-1/3 mx-auto mb-4 sm:mb-10">
        <div class="relative w-1/2 mx-auto"> <!-- Adjusted width here -->
          <input
            type="text"
            placeholder="Type here..."
            class="w-full py-1 px-8 rounded-full bg-gradient-to-r from-[#00305F] to-[#0064C5] text-white placeholder-white text-sm"
            v-model="searchQuery"
          />
          <SearchIcon class="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-4 sm:h-4 text-white" /> <!-- ปรับขนาดไอคอน -->
        </div>
      </div>

      <!-- Menu Items -->
      <div class="w-full mx-auto">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-2 sm:mb-4 md:mb-6">
          <div
            v-for="item in topRowItems"
            :key="item.name"
            class="bg-white p-2 sm:p-4 rounded-lg shadow-md cursor-pointer"
            @click="handleItemClick(item)"
          >
            <div class="flex flex-col items-center">
              <component :is="item.icon" class="w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2 text-[#000]" />
              <span class="text-[#000] text-xs sm:text-sm text-center">{{ item.name }}</span>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          <div
            v-for="item in bottomRowItems"
            :key="item.name"
            class="bg-white p-2 sm:p-4 rounded-lg shadow-md cursor-pointer"
            @click="handleItemClick(item)"
          >
            <div class="flex flex-col items-center">
              <component :is="item.icon" class="w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2 text-[#000]" />
              <span class="text-[#000] text-xs sm:text-sm text-center">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white p-2 sm:p-4 text-center text-xs sm:text-sm text-gray-600">
      Copyright © 2024
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Truck, Package, ClipboardCheck, RefreshCw, BellIcon, SettingsIcon, UserIcon, SearchIcon } from 'lucide-vue-next';

export default defineComponent({
  name: 'WarehouseManagementUI',
  components: {
    Truck, Package, ClipboardCheck, RefreshCw, BellIcon, SettingsIcon, UserIcon, SearchIcon
  },
  setup() {
    const searchQuery = ref(''); // ตัวแปรสำหรับเก็บค่าค้นหา
    const router = useRouter(); // ใช้สำหรับการนำทาง
    const userPermissions = ref<string[]>([]); // ตัวแปรสำหรับเก็บสิทธิ์ของผู้ใช้
    const username = ref(''); // ตัวแปรสำหรับเก็บชื่อผู้ใช้

    onMounted(() => {
      const token = localStorage.getItem('token'); // ดึง token จาก localStorage
      if (!token) {
        router.push('/'); // ถ้าไม่มี token ให้กลับไปที่หน้าแรก
        return;
      }
      
      try {
        const decodedToken = JSON.parse(atob(token)); // ถอดรหัส token
        username.value = decodedToken.username; // เก็บชื่อผู้ใช้จาก token
        userPermissions.value = decodedToken.permissions; // เก็บสิทธิ์ของผู้ใช้จาก token
      } catch (error) {
        console.error("Error decoding token:", error); // แสดงข้อผิดพลาดถ้าถอดรหัสไม่สำเร็จ
        router.push('/'); // กลับไปที่หน้าแรก
      }
    });

    // รายการเมนูแถวบน
    const topRowItems = [
      { name: 'Goods Receive', icon: Truck, permission: 'goods_receive', route: '/GoodsReceive' },
      { name: 'Putaway', icon: Package, permission: 'putaway', route: '/Putaway' },
      { name: 'Picking', icon: Package, permission: 'picking', route: '/Picking' },
    ];

    // รายการเมนูแถวล่าง
    const bottomRowItems = [
      { name: 'QC', icon: ClipboardCheck, permission: 'qc', route: '/QC' },
      { name: 'Packing', icon: Package, permission: 'packing', route: '/Packing' },
      { name: 'Goods Issue', icon: Truck, permission: 'goods_issue', route: '/GoodsIssue' },
      { name: 'Replenishment', icon: RefreshCw, permission: 'replenishment', route: '/Replenishment' },
    ];

    // ฟังก์ชันตรวจสอบสิทธิ์
    const hasPermission = (permission: string) => {
      return userPermissions.value.includes(permission);
    };

    // ฟังก์ชันจัดการการคลิกที่เมนู
    const handleItemClick = (item: { name: string, permission: string, route: string }) => {
      if (hasPermission(item.permission)) {
        router.push(item.route); // นำทางไปยัง route ที่กำหนด
      } else {
        alert('You do not have permission to access this module.'); // แสดงข้อความถ้าไม่มีสิทธิ์
      }
    };

    return {
      searchQuery,
      topRowItems,
      bottomRowItems,
      handleItemClick,
      hasPermission,
      username,
    };
  },
});
</script>

<style scoped>
/* Styles remain the same */
</style>