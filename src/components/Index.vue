<template>
  <div class="bg-orange h-screen">
    <div class="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-6 gap-0">
      <div class="col-span-1 bg-green">
        <div
          class="text-center mt-4 mb-1 font-semibold flex flex-row items-center"
        >
          <div
            class="
              text-white
              font-nunito
              w-full
              text-xl
              lg:text-2xl
              xl:text-6xl
              mx-2
            "
          >
            <div>{{ time }}</div>
          </div>
        </div>
        <div
          class="
            font-nunito
            w-full
            text-base
            lg:text-xl
            xl:text-2xl
            text-white text-center
            font-extrabold
            relative
          "
        >
          <div class="w-full">
            {{ formatDate(date) }}
          </div>
        </div>
        <div class="side-content hidden lg:block xl:block">
          <Side
            class="mt-3"
            title="Ceramah Subuh"
            :content="this.ceramahSubuh"
          ></Side>
          <Side
            class="mt-3"
            title="Khatib Jum’at"
            :content="this.ceramahJumat"
          ></Side>
        </div>
      </div>

      <div class="relative m-0 col-span-5">
        <!-- <div class="flex flex-col items-center justify-center h-screen relative"> -->
        <div class="lg:h-screen xl:h-screen">
          <div class="header bg-transparent w-full pt-4" style="z-index: 2">
            <div>
              <img
                class="logo w-auto h-10 lg:h-20 xl:h-20"
                src="../assets/logo.png"
              />
              <div class="font-ubuntu text-center">
                <h1
                  class="
                    text-base
                    lg:text-xl
                    xl:text-2xl
                    font-extrabold
                    uppercase
                    text-blue-midnight
                  "
                >
                  Masjid Al Amanah
                </h1>
                <h2
                  class="
                    text-base
                    lg:text-xl
                    xl:text-2xl
                    font-semibold
                    text-blue-midnight
                  "
                >
                  Jl. Kawaluyaan Indah I No.11
                </h2>
              </div>
            </div>
          </div>
          <div
            class="
              mt-4
              mx-auto
              p-4
              w-1/3
              md:w-1/3
              lg:w-1/2
              xl:w-1/2
              hidden
              lg:block
              xl:block
            "
          >
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
                  keluarganya kecuali shalat itu.” (HR. Bukhari no. 659 dan
                  Muslim no. 649)
                </div>
              </div>
              <div v-else>
                <!-- <VuePlayerVideo
                  src="https://kawaluyaan-rw05.com/amanah/assets/video3.mp4"
                  :autoplay="true"
                  :loop="true"
                  :controls="false"
                  :colors="'#1D2088'"
                ></VuePlayerVideo> -->
              </div>
              <!-- <div class="text-center" v-if="iqomah < itv && iqomah > 0">
              {{ formatTime(iqomah) }} Menuju Iqomah
            </div> -->
            </div>
          </div>
          <div class="flex flex-col items-center w-full relative">
            <div
              class="
                block
                md:flex
                lg:flex
                xl:flex
                items-center
                font-nunito
                mt-5
                absolute
                -top-2
              "
            >
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
      </div>
      <div class="absolute bottom-0 py-1 w-full text-white bg-blue-midnight">
        <marquee-text
          :duration="40"
          class="text-lg lg:text-2xl xl:text-4xl uppercase"
        >
          &#160; - tetap jaga protokol kesehatan dengan menggunakan masker
          selama di area Masjid Al Amanah - tetap jaga protokol kesehatan dengan
          menggunakan masker selama di area Masjid Al Amanah
        </marquee-text>
      </div>
    </div>
  </div>
</template>

<script>
import Time from "../components/Time.vue";
import Side from "../components/Side.vue";
import axios from "axios";
import { DateTime } from "luxon";
// import VuePlayerVideo from "vue3-player-video";
import MarqueeText from "vue-marquee-text-component";

const times = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"];
const FAJR_LECTURER = [
  {
    date: "01-03-2024",
    day: "Sabtu",
    lecturer: "Ustd. Dede Misbahul Aziz",
  },
  {
    date: "02-03-2024",
    day: "Ahad",
    lecturer: "Ustd. Dede Misbahul Aziz",
  },
  {
    date: "03-03-2024",
    day: "Senin",
    lecturer: "H. Nandana Pawitra",
  },
  {
    date: "04-03-2024",
    day: "Selasa",
    lecturer: "Ust. Heru Nugraha",
  },
  {
    date: "05-03-2024",
    day: "Rabu",
    lecturer: "H. Asep Kusmayadi",
  },
  {
    date: "06-03-2024",
    day: "Kamis",
    lecturer: "H. Syamsu Hudaya",
  },
  {
    date: "07-03-2024",
    day: "Jum’at",
    lecturer: "H. Budi Pujianto",
  },
  {
    date: "08-03-2024",
    day: "Sabtu",
    lecturer: "Prof. Dr. Engkus Kuswarno",
  },
  {
    date: "09-03-2024",
    day: "Ahad",
    lecturer: "Ustd. Lili El Jumali",
  },
  {
    date: "10-03-2024",
    day: "Senin",
    lecturer: "Ustd. Dede Misbahul Aziz",
  },
  {
    date: "11-03-2024",
    day: "Selasa",
    lecturer: "H. Nur Hasan",
  },
  {
    date: "12-03-2024",
    day: "Rabu",
    lecturer: "Muhammad Juanda",
  },
  {
    date: "13-03-2024",
    day: "Kamis",
    lecturer: "Rahmat Hidayat",
  },
  {
    date: "14-03-2024",
    day: "Jum’at",
    lecturer: "H. Rizal Fakta Basri",
  },
  {
    date: "15-03-2024",
    day: "Sabtu",
    lecturer: "AL -Ustadz H. Peto Syarif",
  },
  {
    date: "16-03-2024",
    day: "Ahad",
    lecturer: "KH. Athian Ali M. Dai, Lc, MA",
  },
  {
    date: "17-03-2024",
    day: "Senin",
    lecturer: "Ustd. Dede Misbahul Aziz",
  },
  {
    date: "18-03-2024",
    day: "Selasa",
    lecturer: "H. Awan Nasution",
  },
  {
    date: "19-03-2024",
    day: "Rabu",
    lecturer: "H. Heryadi Santosa",
  },
  {
    date: "20-03-2024",
    day: "Kamis",
    lecturer: "H. M. Suhairi Wahab",
  },
  {
    date: "21-03-2024",
    day: "Jum’at",
    lecturer: "H. Djusep Sukriatno",
  },
  {
    date: "22-03-2024",
    day: "Sabtu",
    lecturer: "Ustd. H. M. Rizal Fadilah, SH",
  },
  {
    date: "23-03-2024",
    day: "Ahad",
    lecturer: "Ustd. Dede Misbahul Aziz",
  },
  {
    date: "24-03-2024",
    day: "Senin",
    lecturer: "H. Nur Hasan",
  },
  {
    date: "25-03-2024",
    day: "Selasa",
    lecturer: "Muhammad Juanda",
  },
  {
    date: "26-03-2024",
    day: "Rabu",
    lecturer: "Rahmat Hidayat",
  },
  {
    date: "27-03-2024",
    day: "Kamis",
    lecturer: "Ust. Heru Nugraha",
  },
  {
    date: "28-03-2024",
    day: "Jum’at",
    lecturer: "H. Kuswandani",
  },
  {
    date: "29-03-2024",
    day: "Sabtu",
    lecturer: "Prof. Dr. Engkus Kuswarno",
  },
  {
    date: "30-03-2024",
    day: "Ahad",
    lecturer: "H. Kuswandani",
  },
  {
    date: "31-03-2024",
    day: "Senin",
    lecturer: "Ir. Rahmatullah Arrizal",
  },
];
const JUMAAH_LECTURER = [
  {
    date: "08-03-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz Hafidz Muslim",
  },
  {
    date: "15-05-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz Nurdin Sya'bana",
  },
  {
    date: "21-01-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  H. Dede Tasmara",
  },
  {
    date: "28-01-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz Lili Jumali",
  },
  {
    date: "04-02-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Jajang Juanda S.Ag.",
  },
  {
    date: "11-02-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  H. Edi Ahmadi, S.Ag.",
  },
  {
    date: "18-02-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz Apad Ruslan",
  },
  {
    date: "25-02-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Muhamad Ardin",
  },
  {
    date: "04-03-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz Dede Misbahul Aziz",
  },
  {
    date: "11-03-2024",
    day: "Jum’at",
    lecturer: "Ustadz Drs H.Muslim Arief, M.Pd.I",
  },
  {
    date: "18-03-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Muhamad Rivan",
  },
  {
    date: "25-03-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Drs. H. M. S. Iriyanto",
  },
  {
    date: "01-04-2024",
    day: "Jum’at",
    lecturer: "Rahmat Hidayat",
  },
  {
    date: "08-04-2024",
    day: "Jum’at",
    lecturer: "H. Syamsu Hudaya",
  },
  {
    date: "15-04-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Syahidin",
  },
  {
    date: "22-04-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Asep Fathul Rohman",
  },
  {
    date: "29-04-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Asep Sofyan N",
  },
  {
    date: "06-05-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Mudrikah Daud",
  },
  {
    date: "13-05-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz  Sucipto",
  },
  {
    date: "20-05-2024",
    day: "Jum’at",
    lecturer: "",
  },
  {
    date: "27-05-2024",
    day: "Jum’at",
    lecturer: "Al-Ustadz Ali Suparman",
  },
];
export default {
  name: "Index",
  props: {},
  components: {
    Time,
    Side,
    // VuePlayerVideo,
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

      // const url = `https://api.myquran.com/v2/sholat/jadwal/1219/${now.get(
      //   "year"
      // )}/${now.get("month")}/${dd}`;

      const url = `https://api.myquran.com/v2/sholat/jadwal/1219/${now.get(
        "year"
      )}-${now.get("month")}-${dd}`;

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
    getContent: function () {
      // get dynamic content
      this.initFajrLecturer();
      this.initJumaahLecturer();
    },
    initFajrLecturer: function () {
      const now = DateTime.local().toFormat("dd-MM-yyyy");
      const tomorrow = DateTime.local()
        .plus({ days: 1 })
        .toFormat("dd-MM-yyyy");
      const afterTomorrow = DateTime.local()
        .plus({ days: 2 })
        .toFormat("dd-MM-yyyy");
      this.ceramahSubuh = FAJR_LECTURER.filter((c) => {
        if (c.date === now || c.date === tomorrow || c.date === afterTomorrow) {
          return {
            ...c,
          };
        }
      }).map((c) => {
        const newDay = DateTime.fromFormat(c.date, 'dd-MM-yyyy');
        return {
          ...c,
          day: days[newDay.weekday - 1],
          active: c.date === tomorrow,
        };
      });
      // console.log(this.ceramahSubuh);
    },
    initJumaahLecturer: function () {
      const now = DateTime.local().set({ weekday: 5 });
      const next = DateTime.local().set({ weekday: 5 }).plus({ weeks: 1 });
      const afterNext = DateTime.local().set({ weekday: 5 }).plus({ weeks: 2 });
      const afterAfterNext = DateTime.local()
        .set({ weekday: 5 })
        .plus({ weeks: 3 });
      this.ceramahJumat = JUMAAH_LECTURER.filter((c) => {
        if (
          c.date === now.toFormat("dd-MM-yyyy") ||
          c.date === next.toFormat("dd-MM-yyyy") ||
          c.date === afterNext.toFormat("dd-MM-yyyy") ||
          c.date === afterAfterNext.toFormat("dd-MM-yyyy")
        ) {
          return {
            c,
          };
        }
      }).map((c) => {
        const dat = DateTime.fromFormat(c.date, "dd-MM-yyyy");
        const diff = dat.diffNow("days").days;
        console.log(diff);
        return {
          ...c,
          active: diff < 7 && diff > 0,
        };
      });
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
      pray: {
        Imsak: "00:00",
        Sunrise: "00:00",
        Fajr: "00:00",
        Dhuhr: "00:00",
        Asr: "00:00",
        Maghrib: "00:00",
        Isha: "00:00",
      },
      location: Object,
      date: String,
      active: null,
      beforeSholat: null,
      iqomah: null,
      // 10 minute after adzan
      itv: 600,
      playing: true,
      initiateDate: Number,
      ceramahSubuh: [],
      ceramahJumat: [],
    };
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  mounted() {
    this.active = "Fajr";
    this.getPrayTime();

    this.getContent();

    this.initiateDate = 0;

    // update the time every second
    this.interval = setInterval(() => {
      const now = DateTime.local();
      this.time = now.setLocale("id").toFormat("HH:mm:ss");
      this.initiateDate++;
      const splitTime = this.time.split(":");

      // refresh on every ten minutes
      if (
        this.initiateDate > 60 * 10 ||
        (splitTime[1] === "00" && splitTime[2] === "00")
      ) {
        this.getContent();
        this.getPrayTime();
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
  /* width: auto;
  height: 100px; */
  margin: 0 auto;
}
/* .main-content {
  height: 50vh;
}
.side-content {
  height: 82.5vh;
} */
</style>
