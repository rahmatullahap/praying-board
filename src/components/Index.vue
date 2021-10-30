<template>
  <div>
    <div class="mx-6">
      <div class="flex justify-between">
        <div class="flex flex-col items-center justify-center h-screen">
          <div class="text-center my-4 text-3xl font-semibold">
            <div>{{ date }}</div>
            <div class="font-nunito">{{ time }}</div>
          </div>
          <img class="logo" src="../assets/logo-alamanah.png" />
          <div class="font-ubuntu text-center">
            <h1 class="text-2xl font-extrabold my-2">Masjid Al Amanah</h1>
            <h2 class="font-semibold">Jl. Kawaluyaan Indah I No.11</h2>
            <div class="mt-2">{{ location.city }}</div>
          </div>
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
          <div class="text-center my-4 text-2xl font-semibold">
            <div
              class="text-center"
              v-if="beforeSholat < itv && beforeSholat > 0"
            >
              {{ formatTime(beforeSholat) }} Menuju Adzan
            </div>
            <div class="text-center" v-if="iqomah < itv && iqomah > 0">
              {{ formatTime(iqomah) }} Menuju Iqomah
            </div>
          </div>
        </div>
        <div class="ml-2 w-1/2">
          <div class="flex flex-col items-center justify-center h-screen">
            <VuePlayerVideo
              src="https://kawaluyaan-rw05.com/amanah/assets/construction.mp4"
              :autoplay="true"
              :loop="true"
            ></VuePlayerVideo>
          </div>
        </div>
      </div>
    </div>
    <marquee-text>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna.
    </marquee-text>
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
      video: "../assets/video.mp4",
      playing: true,
    };
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  mounted() {
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
    axios
      .get("https://api.pray.zone/v2/times/today.json?city=bandung")
      .then((response) => {
        const result = response.data.results;
        const datetime = result.datetime[0];
        this.pray = datetime.times;
        this.location = result.location;

        const today = DateTime.local().setLocale("id").toFormat("DDDD");
        this.date = today;
      });

    this.active = "Fajr";

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
  width: 150px;
  height: auto;
  margin: 0 auto;
}
</style>
