<template>
  <div>
    <div class="relative m-0">
      <!-- <div class="flex flex-col items-center justify-center h-screen relative"> -->
      <div class="h-screen">
        <div
          class="header w-full grid grid-cols-3 gaps-2 bg-white pt-4"
          style="z-index: 2"
        >
          <div
            class="
              text-center
              my-4
              text-3xl
              font-semibold
              flex flex-row
              items-center
            "
          >
            <div class="font-nunito w-full text-3xl m-2">
              <div>
                {{ formatDate(date) }}
              </div>
            </div>
          </div>
          <div>
            <img class="logo" src="../assets/logo-alamanah.png" />
            <div class="font-ubuntu text-center">
              <h1 class="text-2xl font-extrabold my-2">Masjid Al Amanah</h1>
              <h2 class="font-semibold">Jl. Kawaluyaan Indah I No.11</h2>
            </div>
          </div>
          <div
            class="
              text-center
              my-4
              text-3xl
              font-semibold
              flex flex-row
              items-center
            "
          >
            <div
              class="
                bg-blue-midnight
                text-white
                border border-solid
                rounded-2xl
                font-nunito
                w-full
                text-6xl
                m-2
              "
            >
              <div>{{ time }} WIB</div>
            </div>
          </div>
        </div>
        <div class="mt-4 mx-auto p-4 w-1/2">
          <div
            class="
              main-content
              text-center text-2xl
              font-semibold
              flex flex-row
              items-center
            "
          >
            <div
              class="my-4 items-center h-full w-full"
              v-if="beforeSholat < itv && beforeSholat > 0"
            >
              <div class="uppercase text-3xl font-semibold">Menuju Adzan</div>
              <div
                class="
                  bg-blue-midnight
                  text-white
                  border border-solid
                  rounded-2xl
                  font-nunito
                "
              >
                <span class="text-6xl">{{ formatTime(beforeSholat) }}</span>
              </div>
              <div class="text-2xl mt-2">
                Rasulullah shallallahu ‘alaihi wa sallam bersabda, “Dan
                seseorang dari kalian senantiasa dihitung dalam keadaan shalat
                selama shalat itu menahannya (dia menanti palaksanaan shalat).
                Di mana tidak ada yang menghalangi dia untuk kembali kepada
                keluarganya kecuali shalat itu.” (HR. Bukhari no. 659 dan Muslim
                no. 649)
              </div>
            </div>
            <div v-else>
              <VuePlayerVideo
                src="https://kawaluyaan-rw05.com/amanah/assets/video2.mp4"
                :autoplay="true"
                :loop="true"
                :controls="false"
                :colors="'#1D2088'"
              ></VuePlayerVideo>
            </div>
            <!-- <div class="text-center" v-if="iqomah < itv && iqomah > 0">
              {{ formatTime(iqomah) }} Menuju Iqomah
            </div> -->
          </div>
        </div>
        <div class="flex flex-col items-center w-screen">
          <div class="flex items-center font-nunito mt-5">
            <Time
              :label="'Subuh'"
              :time="pray.Fajr"
              :active="active === 'Fajr'"
            ></Time>
            <Time
              :label="'Dzuhur'"
              :time="pray.Dhuhr"
              :active="active === 'Dhuhr'"
            ></Time>
            <Time
              :label="'Ashar'"
              :time="pray.Asr"
              :active="active === 'Asr'"
            ></Time>
            <Time
              :label="'Maghrib'"
              :time="pray.Maghrib"
              :active="active === 'Maghrib'"
            ></Time>
            <Time
              :label="'Isya'"
              :time="pray.Isha"
              :active="active === 'Isha'"
            ></Time>
          </div>
        </div>
      </div>
      <div class="absolute bottom-4 w-full text-white bg-blue-midnight">
        <marquee-text :repeat="10" class="text-2xl">
          - Al Amanah Kawaluyaan Kota Bandung 
        </marquee-text>
      </div>
    </div>
  </div>
</template>

<script>
import Time from "../components/Time.vue";
import axios from "axios";
import { DateTime } from "luxon";
import VuePlayerVideo from "vue3-player-video";
import MarqueeText from "vue-marquee-text-component";

const times = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
export default {
  name: "Index",
  props: {},
  components: {
    Time,
    VuePlayerVideo,
    MarqueeText,
  },
  methods: {
    getPrayTime: function () {
      // for testing
      // this.pray = {
      //   Imsak: "04:01",
      //   Sunrise: "05:19",
      //   Fajr: "04:11",
      //   Dhuhr: "11:33",
      //   Asr: "14:48",
      //   Maghrib: "15:25",
      //   Isha: "15:30",
      // };
      // const url =
      //   "https://api.pray.zone/v2/times/today.json?school=3&juristic=1&longitude=106.8597248&latitude=-6.1702144&elevation=6";

      const now = DateTime.local();

      let day = now.get("day");
      let dd = day.toString();
      if (day < 10) {
        dd = "0" + dd;
      }

      const url = `https://api.myquran.com/v1/sholat/jadwal/1219/${now.get(
        "year"
      )}/${now.get("month")}/${dd}`;

      axios.get(url).then((response) => {
        // const result = response.data.results;
        // const datetime = result.datetime[0];
        // this.pray = datetime.times;
        // this.location = result.location;

        const today = now.toJSDate();
        this.date = today;

        const result = response.data.data;
        this.location = result.lokasi;
        const j = result.jadwal;
        this.pray = {
          Imsak: j.imsak,
          Sunrise: j.terbit,
          Fajr: j.subuh,
          Dhuhr: j.dzuhur,
          Asr: j.ashar,
          Sunset: "00:00",
          Maghrib: j.maghrib,
          Isha: j.isya,
          Midnight: "23:59",
        };
      });
    },
    formatDate: function (date) {
      const now = DateTime.local(new Date(date));
      const formatdate = now.setLocale("id").toFormat("EEEE, dd MMMM yyyy");
      if (formatdate.includes("Minggu")) {
        return formatdate.replace("Minggu", "Ahad");
      }
      return formatdate;
    },
    formatTime: function (seconds) {
      const minute = Math.floor(seconds / 60);
      const second = Math.floor(seconds % 60);

      let m = minute.toString();
      let s = second.toString();

      if (second < 10) {
        s = "0" + s;
      }
      if (minute < 10) {
        m = "0" + m;
      }
      return `${m} : ${s}`;
    },
    getNearerTime: function () {
      const diffs = [];
      const now = DateTime.local();
      for (const i in this.pray) {
        const time = this.pray[i];
        const hour = time.split(":")[0];
        const minute = time.split(":")[1];
        const date = now.set({ hour, minute, second: 0 });
        const diff = Math.ceil(date.diffNow("seconds").seconds);
        if (diff >= 0 && times.includes(i)) {
          diffs.push({
            time: i,
            diff,
          });
        }
      }

      if (diffs.length === 0) {
        this.active = times[0];
      } else {
        this.active = diffs[0].time;
        this.beforeSholat = diffs[0].diff;
      }

      let idx = times.findIndex((t) => t === this.active) || 0;
      if (idx !== 0) {
        idx--;
      } else {
        idx = 4;
      }
      const iq = this.pray[times[idx]];

      const time = iq;
      const hour = time.split(":")[0];
      const minute = time.split(":")[1];
      const date = now.set({ hour, minute, second: 0 });
      const diff = Math.ceil(date.diffNow("seconds").seconds) + this.itv;

      if (diff >= 0) {
        this.iqomah = diff;
      }
    },
  },
  data() {
    return {
      interval: null,
      time: null,
      pray: Object,
      location: Object,
      date: String,
      active: null,
      beforeSholat: null,
      iqomah: null,
      // 10 minute after adzan
      itv: 600,
      playing: true,
    };
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  mounted() {
    this.active = "Fajr";
    this.getPrayTime();

    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = DateTime.local().setLocale("id").toFormat("HH:mm:ss");

      this.getNearerTime();
    }, 1000);
  },
};
</script>

<style scoped>
.logo {
  width: auto;
  height: 100px;
  margin: 0 auto;
}
.main-content {
  min-height: 40vh;
}
</style>
