<template>
  <div class="bg-wrap h-full">
    <img class="background-image" src="../assets/bg.jpg" alt="" />
    <div class="content h-full" v-if="!isOnSholat()">
      <div
        class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-0 lg:h-full xl:h-full"
      >
        <div class="col-span-1 bg-green-cyan">
          <div
            class="text-center mt-4 mb-1 font-semibold flex flex-row items-center"
          >
            <div class="text-white font-nunito w-full mx-2">
              <div class="text:2xl lg:text-5xl xl:text-5xl">{{ time }}</div>
            </div>
          </div>
          <div
            class="font-nunito w-full text-base lg:text-l xl:text-xl text-white text-center font-extrabold relative"
          >
            <div class="w-full">
              {{ formatDate(date) }}
            </div>
          </div>
          <div class="side-content pb-2">
            <Side
              class="mt-3"
              title="Penceramah Subuh"
              :content="this.ceramahMain"
            ></Side>
            <Side
              class="mt-3"
              title="Khatib Jum’at"
              :content="this.ceramahJumat"
            ></Side>
            <!-- <div class="mx-4 bg-white mt-3" v-if="qrCode && qrCode.detail">
              <div
                class="text-base xl:text-xl font-extrabold text-center mb-0 px-6 pt-3"
              >
                {{ qrCode.info }}
              </div>
              <div class="flex items-center justify-center py-3">
                <vue-qrcode
                  :value="qrCode.detail"
                  :options="{ width: 200 }"
                ></vue-qrcode>
              </div>
            </div> -->
          </div>
        </div>

        <div class="relative m-0 col-span-3">
          <!-- <div class="flex flex-col items-center justify-center relative"> -->
          <div class="h-full">
            <div class="header bg-transparent w-full pt-4" style="z-index: 2">
              <div>
                <img
                  class="logo w-auto h-10 lg:h-20 xl:h-20"
                  src="../assets/logo.png"
                />
                <div class="font-ubuntu text-center">
                  <h1
                    class="text-base lg:text-xl xl:text-2xl font-extrabold uppercase text-blue-midnight"
                  >
                    Masjid Al Amanah
                  </h1>
                  <h2
                    class="text-base lg:text-xl xl:text-2xl font-semibold text-blue-midnight"
                  >
                    Jl. Kawaluyaan Indah I No.11
                  </h2>
                </div>
              </div>
            </div>
            <div
              class="mt-4 hidden lg:block xl:flex w-full justify-center items-center"
            >
              <div
                class="main-content text-center text-2xl font-semibold flex flex-row items-center justify-center"
              >
                <div
                  class="my-4 items-center h-full w-3/5"
                  v-if="
                    beforeSholat < itv &&
                    beforeSholat > 0 &&
                    active !== 'Sunrise'
                  "
                >
                  <div class="uppercase text-3xl font-semibold">
                    Menuju Adzan
                  </div>
                  <div
                    class="bg-blue-midnight text-white border border-solid rounded-2xl font-nunito"
                  >
                    <span class="text-6xl">{{ formatTime(beforeSholat) }}</span>
                  </div>
                  <div class="text-xl mt-2">
                    Rasulullah shallallahu ‘alaihi wa sallam bersabda, “Dan
                    seseorang dari kalian senantiasa dihitung dalam keadaan
                    shalat selama shalat itu menahannya (dia menanti palaksanaan
                    shalat). Di mana tidak ada yang menghalangi dia untuk
                    kembali kepada keluarganya kecuali shalat itu.” (HR. Bukhari
                    no. 659 dan Muslim no. 649)
                  </div>
                </div>
                <div
                  class="my-4 items-center h-full w-3/5"
                  v-else-if="
                    iqomah < itv_iqomah && iqomah > 0 && active !== 'Sunrise'
                  "
                >
                  <ModalComponent v-if="iqomah < itv_iqomah && iqomah > 0 && active !== 'Sunrise'">
                    <div class="uppercase text-3xl font-semibold">
                      Menuju Iqomah
                    </div>
                    <div
                      class="bg-blue-midnight text-white border border-solid rounded-2xl font-nunito mx-20"
                    >
                      <span class="text-6xl">{{ formatTime(iqomah) }}</span>
                    </div>
                    <div class="text-xl mt-2">
                      <div class="text-4xl">
                        اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ
                        وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ
                        وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي
                        وَعَدْتَهُ اِنَكَ لاَ تُخْلِفُ اْلمِيْعَاد
                      </div>
                      <div class="my-2 text-lg">
                        Allahumma rabba haadzihid da'watit taammah. Wash
                        shalaatil qaa-imah. Aati muhammadal wasiilata wal
                        fadhiilah, wab'atshu maqoomam mahmuudal ladzii wa'adtahu
                        innaka la tukhliful mi'ad.
                      </div>
                      <div class="text-xl">
                        "Ya Allah, Tuhan yang memiliki panggilan ini, yang
                        sempurna dan memiliki salat yang didirikan. Berilah Nabi
                        Muhammad wasilah dan keutamaan, serta kemuliaan dan
                        derajat yang tinggi, dan angkatlah ia ke tempat yang
                        terpuji sebagaimana yang Engkau telah janjikan."
                      </div>
                    </div>
                  </ModalComponent>
                </div>
                <div v-else>
                  <div
                    class="text-xl mt-2 flex items-center justify-center"
                    v-if="hadits.length"
                  >
                    <div class="w-1/2">
                      {{ hadits[currentIndex] }}
                    </div>
                  </div>
                  <div
                    class="flex justify-center relative"
                    style="width: 48vw; height: 49vh"
                    v-else
                  >
                    <iframe
                      :src="video_url"
                      title="Youtube Video"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      style="
                        overflow: hidden;
                        overflow-x: hidden;
                        overflow-y: hidden;
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        right: 0px;
                        bottom: 0px;
                      "
                      height="100%"
                      width="100%"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center w-full relative">
              <div
                class="flex md:flex lg:flex xl:flex items-center font-nunito mt-1 absolute top-2 gap-0 lg:gap-3 xl:gap-3"
              >
                <Time
                  :label="'Subuh'"
                  :time="pray.Fajr"
                  :active="active === 'Fajr'"
                ></Time>
                <Time
                  :label="'Syuruq'"
                  :time="pray.Sunrise"
                  :active="active === 'Sunrise'"
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
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-0 py-1 w-full text-white bg-blue-midnight" v-if="!isOnSholat()">
    <marquee-text
      :duration="40"
      class="text-lg lg:text-2xl xl:text-4xl uppercase"
    >
      {{ runningText.join("&#160; - ") }}
    </marquee-text>
  </div>
</template>

<script>
import Time from "../components/Time.vue";
import Side from "../components/Side.vue";
import ModalComponent from '../components/Modal.vue';
import axios from "axios";
import { DateTime } from "luxon";
import MarqueeText from "vue-marquee-text-component";

const times = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"];
export default {
  name: "Index",
  props: {},
  components: {
    Time,
    Side,
    MarqueeText,
    ModalComponent
  },
  methods: {
    getPrayTime: async function () {
      const now = DateTime.local();

      let day = now.get("day");
      let dd = day.toString();
      if (day < 10) {
        dd = "0" + dd;
      }

      let { data: pray_data } = await this.$store.state.database
        .from("pray_time")
        .select("id, time, exact_time, iqomah")
        .order("id");

      pray_data = pray_data.map((p) => {
        const time = p.exact_time
          ? p.exact_time.split(":").splice(0, 2).join(":")
          : null;
        return {
          ...p,
          exact_time: time,
        };
      });

      const url = `https://api.myquran.com/v2/sholat/jadwal/1219/${now.get(
        "year"
      )}-${now.get("month")}-${dd}`;

      axios.get(url).then((response) => {
        const today = now.toJSDate();
        this.date = today;

        const result = response.data.data;
        this.location = result.lokasi;
        const j = result.jadwal;
        this.pray = {
          Imsak: pray_data[0].exact_time || j.imsak,
          Sunrise: pray_data[1].exact_time || j.terbit,
          Fajr: pray_data[2].exact_time || j.subuh,
          Dhuhr: pray_data[3].exact_time || j.dzuhur,
          Asr: pray_data[4].exact_time || j.ashar,
          Sunset: "00:00",
          Maghrib: pray_data[5].exact_time || j.maghrib,
          Isha: pray_data[6].exact_time || j.isya,
          Midnight: "23:59",
        };
        this.offset = {
          Imsak: parseInt(pray_data[0].iqomah || "10") * 60,
          Sunrise: parseInt(pray_data[1].iqomah || "10") * 60,
          Fajr: parseInt(pray_data[2].iqomah || "10") * 60,
          Dhuhr: parseInt(pray_data[3].iqomah || "10") * 60,
          Asr: parseInt(pray_data[4].iqomah || "10") * 60,
          Maghrib: parseInt(pray_data[5].iqomah || "10") * 60,
          Isha: parseInt(pray_data[6].iqomah || "10") * 60,
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
    getContent: async function () {
      // get dynamic content
      await this.initMainLecturer();
      await this.initJumaahLecturer();
      await this.initRunningText();
      await this.initQrCode();
      await this.initVideo();
      await this.initHadits();
    },
    initMainLecturer: async function () {
      const now = DateTime.local().toFormat("dd-MM-yyyy");
      const tomorrow = DateTime.local()
        .plus({ days: 1 })
        .toFormat("dd-MM-yyyy");
      const afterTomorrow = DateTime.local()
        .plus({ days: 2 })
        .toFormat("dd-MM-yyyy");
      // const afterAfterTomorrow = DateTime.local()
      //   .plus({ days: 3 })
      //   .toFormat("dd-MM-yyyy");

      let { data } = await this.$store.state.database
        .from("penceramah_subuh")
        .select("*")
        .or(`date.eq.${now},date.eq.${tomorrow},date.eq.${afterTomorrow}`)
        .order("id");

      this.ceramahMain = data
        .filter((c) => {
          if (
            c.date === now ||
            c.date === tomorrow ||
            c.date === afterTomorrow
          ) {
            return {
              ...c,
            };
          }
        })
        // .splice(0,3)
        .map((c) => {
          const newDay = DateTime.fromFormat(c.date, "dd-MM-yyyy");
          return {
            ...c,
            day: days[newDay.weekday - 1],
            active: c.date === now,
          };
        });
    },
    initJumaahLecturer: async function () {
      const now = DateTime.local().set({ weekday: 5 });
      const next = DateTime.local().set({ weekday: 5 }).plus({ weeks: 1 });
      // const afterNext = DateTime.local().set({ weekday: 5 }).plus({ weeks: 2 });
      // const afterAfterNext = DateTime.local()
      //   .set({ weekday: 5 })
      //   .plus({ weeks: 3 });

      let { data: jumat_data } = await this.$store.state.database
        .from("penceramah_jumat")
        .select("*")
        .order("id");

      jumat_data = jumat_data.map((j) => {
        return {
          ...j,
          date: j.date ? j.date.trim() : null,
        };
      });

      this.ceramahJumat = jumat_data
        .filter((c) => {
          if (
            c.date === now.toFormat("dd-MM-yyyy") ||
            c.date === next.toFormat("dd-MM-yyyy")
          ) {
            return {
              c,
            };
          }
        })
        .map((c) => {
          const dat = DateTime.fromFormat(c.date, "dd-MM-yyyy");
          const diff = dat.diffNow("days").days;
          const newDay = DateTime.fromFormat(c.date, "dd-MM-yyyy");
          return {
            ...c,
            day: days[newDay.weekday - 1],
            active: diff < 7 && diff > 0,
            date_format: DateTime.fromFormat(c.date, 'dd-MM-yyyy').toJSDate()
          };
        }).sort((a, b) => a.date_format - b.date_format);
    },
    getNearerTime: function () {
      const diffs = [];
      const now = DateTime.local();
      for (const i in this.pray) {
        const time = this.pray[i].split(":");
        const hour = time[0];
        const minute = time[1];
        const date = now.set({ hour, minute, second: 0 });
        const dateNow = DateTime.local();
        const diff = Math.ceil(date.diff(dateNow, "seconds").seconds);
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
        idx = times.length - 1;
      }
      const iq = this.pray[times[idx]];
      this.itv_iqomah = this.offset[times[idx]];

      const time = iq;
      const hour = time.split(":")[0];
      const minute = time.split(":")[1];
      const date = now.set({ hour, minute, second: 0 });
      const diff = Math.ceil(date.diffNow("seconds").seconds) + this.itv_iqomah;

      if (diff >= 0) {
        this.iqomah = diff;
      }

      const time1 = this.pray[times[idx]];
      const hour1 = time1.split(":")[0];
      const minute1 = time1.split(":")[1];
      const date1 = now.set({ hour: hour1, minute: minute1, second: 0 });
      const iqmh = date1.plus({seconds: this.itv_iqomah});
      const diffSholat = Math.ceil(iqmh.diffNow("seconds").seconds);
      if (diffSholat < 0) {
        this.sholat = Math.abs(diffSholat);
      }
    },
    initRunningText: async function () {
      let { data } = await this.$store.state.database
        .from("information")
        .select("*")
        .eq("key", "running_text");

      const runningtext = [".\t.", ...data.map((d) => d.detail)];
      this.runningText = runningtext;
    },
    initHadits: async function () {
      let { data } = await this.$store.state.database
        .from("hadits")
        .select("*")
        .not("hadits", "is", null);

      const d = [...data.map((d) => d.hadits)];
      this.hadits = d;
    },
    initQrCode: async function () {
      let { data } = await this.$store.state.database
        .from("information")
        .select("*")
        .eq("key", "qr_code");

      if (data.length) {
        this.qrCode = {
          info: data[0].info,
          detail: data[0].detail,
        };
      }
    },
    initVideo: async function () {
      let { data } = await this.$store.state.database
        .from("information")
        .select("*")
        .eq("key", "stream_video");

      if (data.length) {
        this.video_url = data[0].detail.includes("youtube")
          ? data[0].detail + "?autoplay=1&mute=1"
          : data[0].detail;
      }
    },
    isOnSholat: function () {
      if (this.sholat && this.sholat < this.itv_sholat) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      interval: null,
      time: null,
      pray: {
        Imsak: "00:00",
        Sunrise: "00:00",
        Fajr: "00:00",
        Dhuhr: "00:00",
        Asr: "00:00",
        Maghrib: "00:00",
        Isha: "00:00",
      },
      offset: {
        Imsak: "10",
        Sunrise: "10",
        Fajr: "10",
        Dhuhr: "10",
        Asr: "10",
        Maghrib: "10",
        Isha: "10",
      },
      location: Object,
      date: String,
      active: null,
      beforeSholat: null,
      iqomah: null,
      sholat: null,
      // 10 minute after adzan
      itv: 600,
      itv_iqomah: 600,
      itv_sholat: 10 * 60,
      playing: true,
      initiateDate: Number,
      ceramahMain: [],
      ceramahJumat: [],
      runningText: [],
      hadits: [],
      qrCode: null,
      video_url: null,
      currentIndex: 0,
    };
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  async mounted() {
    this.active = "Fajr";
    await this.getPrayTime();
    await this.getContent();
    this.initiateDate = 0;
    this.currentIndex = Math.floor(Math.random() * this.hadits.length);

    // update the time every second
    this.interval = setInterval(async () => {
      const now = DateTime.local();
      this.time = now.setLocale("id").toFormat("HH:mm:ss");
      this.initiateDate++;
      const splitTime = this.time.split(":");

      if (this.initiateDate % 100 === 0) {
        this.currentIndex = Math.floor(Math.random() * this.hadits.length);
      }

      // refresh on every ten minutes
      if (
        this.initiateDate > 60 * 10 ||
        (splitTime[1] === "00" && splitTime[2] === "00")
      ) {
        await this.getPrayTime();
        await this.getContent();
        this.initiateDate = 0;
        console.log("triggered");
      }

      this.getNearerTime();
    }, 1000);
  },
};
</script>

<style scoped>
.logo {
  margin: 0 auto;
}

.demo-wrap {
  overflow: hidden;
  position: relative;
}

.background-image {
  opacity: 0.2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.content {
  /* background-color: rgba(255, 165, 0, 0.4); */
  position: relative;
}
</style>
