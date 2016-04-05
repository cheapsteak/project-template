import config from '../../../config.js';
const aboveFoldSelector = 'above-fold';

export default [
  {
    slug: 'welcome-1',
    chapterName: 'Welcome',
    title: 'Middle School Choice',
    image: `${config.ASSET_PATH}/article-welcome-1.jpg`,
    aboveFoldSelector: `#${aboveFoldSelector}`,
    content: `<p id="${aboveFoldSelector}">All of our middle schools offer the same rigorous curriculum and provide scholars with an excellent education. But some students have to commute long distances to get to their middle schools. Additionally, some parents prefer their children attend school closer to where they work so they can more easily attend student events. Our middle school choice process allows families the chance to have their scholar attend a more conveniently located middle school.</p>
              <p>In addition to convenience, we think it is important for scholars to have an opportunity to socialize with different children. With middle school choice, kids are able to go to a school with new classmates to make new friends.</p>
              <p>All rising 5th grade families fill out a middle school preference form, ranking their choices of middle schools for the upcoming year. Scholars stay in the same middle school all four years. Scholars are matched to a middle school based on their choices and the number of seats available. Priority is given to scholars with older siblings currently enrolled in the selected middle school and those who live closest to the middle school. Every scholar is guaranteed a seat in a Success Academy middle school, and about 90% of families are matched with their first or second choice of schools.</p>`
  },
  {
    slug: 'welcome-2',
    chapterName: 'Welcome',
    title: 'Special Needs Students at Success Academy',
    aboveFoldSelector: '#above-fold',
    content: `<p id="${aboveFoldSelector}">Success Academy has a strong commitment to serving children with special education needs. We devote many resources to educating students who have been identified for Individualized Education Programs (IEPs): hiring special education teachers and school psychologists, offering Integrated Co-Teaching (ICT) classes in most grades, and providing 12:1:1 classes (12 students, two adults) in schools where we have sufficient space.</p><p>We also provide extra support to scholars who need it by enrolling them in an Academic Elective course for an academic quarter. In this course, they receive high-quality academic intervention in math, literacy, or both. Academic Elective teachers regularly communicate with advisors about scholars’ progress. Here, our most vulnerable scholars develop the skills they need to be successful in a whole-class environment; regain confidence in their abilities as mathematicians, readers, and critical thinkers; and remember what it is that makes learning exciting!</p><p>With our programming, special needs scholars in our schools achieve at a high level:</p><ul><li>During the 2013-14 school year, Success Academy “graduated” or declassified 13% of its special needs scholars from their IEPs.</li>
              <li>On the most recent state exams, more than 11% of all Success Academy test-takers were children with special needs, and 82% of them passed math (compared to 11.4% of citywide special needs students) and 33% passed English (compared to 6.7% citywide).
              <li>Students with disabilities at Success Academy outperformed the NYC average for all students in ELA (33% vs. 29%), and they were nearly twice as likely to pass math as New York State’s students without disabilities (82% vs. 41%).</li></ul>`,
  },
  {
    slug: 'science-1',
    chapterName: 'Science',
    title: 'Science Olympiad',
    image: `${config.ASSET_PATH}/article-welcome-1.jpg`,
    aboveFoldSelector: '#above-fold',
    content: `<p id="${aboveFoldSelector}">Science Olympiad is one of the premier science competitions in the nation, with over 7,300 teams in 50 states taking on rigorous challenges from all STEM disciplines. Learning-by-doing is essential to science education, and Science Olympiad provides scholars unique ways to practice science in a hands-on, inquiry-driven, collaborative environment.</p>
              <p>Scholars work in teams of two or three on projects related to a specific area of science or engineering. Their projects can range anywhere from constructing a glider to becoming expert meteorologists! Our scholars work and train for months on their projects, all in preparation for the NYC regional tournament held each spring.</p>`,
  },
  // FPO CONTENT: Embedded Image
  {
    slug: 'math-1',
    chapterName: 'Math',
    title: 'Math Olympiads: Going Up Against The World’s Best Math Minds',
    image: `${config.ASSET_PATH}/article-welcome-1.jpg`,
    aboveFoldSelector: '#above-fold',
    content: `<p id="${aboveFoldSelector}">Recently, a group of middle school scholars from SA Harlem East were given a set of five math problems to solve. The problems were difficult and unusual. Some, like the one below, puzzled even the adults at the school:</p>
              <p>Soshana looks in a mirror and sees the reflection of a clock behind her as shown in figure A. How many minutes later will the reflection in the mirror of the same clock next show the image shown in figure B?</p>
              <p><img src="${config.ASSET_PATH}/sample-article-image.jpg" />This question appeared in the Math Olympiads, a five-question monthly test given from November to March. Last year, 150,000 students worldwide participated, including Success Academy elementary and middle school scholars. Working individually, without any help from teachers, contestants must find creative ways to solve these problems.</p>
              <p>“They really like the Math Olympiads,” said Jun Yoon, a math teacher at SA Harlem East. “It challenges them, and they get to put all the pieces together and feel good when they do well.”</p>
              <p>In January, Mr. Yoon’s seventh-graders competed against 16,577 students from the U.S. and other countries, all of them taking the same five-question test. Only 9 percent of those students were able to correctly answer every question. Three of them — Bennett Boakye, Messiah Desisso, and Branden Williams — were in Mr. Yoo’s honors math class.</p>
              <p>Never before had any Success Academy middle school scholar earned a perfect score. The news spread quickly and was cause for celebration.</p>
              <p>“My family was freaking out,” said Branden, who wants to go to college for engineering or medicine. “I have been trying so hard for the last two years to get 100 percent on the Math Olympiads, and finally I did it!”</p>
              <p>Participating in these math challenges has boosted the scholars’ confidence and reaffirmed their love of math. Bennett, who plays on the basketball team and wants to go into medicine, said that because of the Math Olympiad, he feels he will be more competitive when applying to top high schools and colleges.</p>
              <p>Mr. Yoon recently asked Branden to elaborate on his passion for math and approach to challenging problems, and for advice that might help his peers do well in upcoming Math Olympiads.</p>
              <h4>Why do you enjoy Math Olympiad?</h4>
              <p>I enjoy Math Olympiad because I get to see all different kind of problems. I get a thrill when I am challenged with questions I have to answer. There are many things that I don’t know, and I want to discover the unknown.</p>
              <h4>What about Math Olympiad do you find challenging?</h4>
              <p>It’s when I come across the type of questions that we didn’t learn and I don’t know how to approach at first.</p>
              <h4>What do you do when you come across challenging problems?</h4>
              <p>I need to remember all the strategies that I already know and piece them together into a new strategy, like into a puzzle.</p>
              <h4>What advice can you give to people who want to do well in Math Olympiad?</h4>
              <p>You have to keep in mind that it will not be easy at first, but you have to keep working through the problems and figure out what you need to do. Remember the strategies that you already know and use what you know.</p>
              <img src="${config.ASSET_PATH}/sample-article-image.jpg" />`,
  },
  {
    slug: 'math-2',
    chapterName: 'Math',
    title: 'Sample Math Problems',
    image: `${config.ASSET_PATH}/article-welcome-1.jpg`,
    aboveFoldSelector: '#above-fold',
    content: `<p id="${aboveFoldSelector}">Curious about the math our scholars practice? Here are some sample problems that 7th graders may encounter on a typical day:</p>
              <p>There are 125% more third graders than fifth graders. If there are 243 third and fifth graders altogether, how many are third graders and how many are fifth graders?</p>
              <p>(Answer: 135 3rd graders and 108 5th graders)</p>
              <p>4x-3(x-2y)+ ½(nx - 8y)</p>
              <p>What must n equal so that the expression is equivalent to 2(2x + y)?</p>
              <p>(Answer: n=6)</p>`,
  },
  {
    slug: 'math-3',
    chapterName: 'Math',
    title: 'Aboard Sailboats, Scholars See Math in Action',
    image: `${config.ASSET_PATH}/article-welcome-1.jpg`,
    aboveFoldSelector: '#above-fold',
    content: `<p id="${aboveFoldSelector}">For three days at the end of May, two dozen seventh-grade scholars from three Success Academy middle schools — Harlem East, Harlem West, and Harlem Central — traveled to Oyster Bay, L.I., to study marine biology, ecosystems, winds, tides, and sailing at the Waterfront Center.</p>
              <p>The scholars learned about different types of sea animals, and the natural and man-made forces that affect their life cycles. Every day, they went sailing, crewing small boats and — on the last day — a historic 40-foot sloop, the Christeen.</p>
              <p>I think it surprised the scholars how much of what they were learning had to do with math. It surprised me, too – but as a teacher, I found it exciting for the scholars to see how a fun activity like sailing could have as its foundation the mathematical concepts and skills they had studied in school.</p>
              <p>At the Waterfront Center’s anemometer creation workshop, everything the scholars learned in middle school math was put to the test. Anemometers are devices that look sort of like pinwheels and measure wind speed. The faster the anemometer spins, the harder the wind is blowing. But how do you know what the speed is? The answer is calibration, using math conversions, ratios, rates, and proportions.</p>
              <p>First, the scholars used a common household fan and an electronic anemometer, which was plugged into a smartphone, to get an accurate wind speed. Then, they built their own anemometers using paper cups, straws, push pins, and pencils, and tested them using the wind generated by the fan. They had to compare the speed of their anemometers against the real one, figure out the difference in performance, and calculate how to correct for the error in order to get an accurate reading on their own devices.</p>
              <p>Because wind speed is measured in knots, or nautical miles per hour, they had to learn how to convert that number to the more familiar measurement of (statute) miles per hour.</p>
              <p>The scholars also studied the cardinal directions, which not only have names – north, south, east, and west – but numbers as well. North is 360 degrees; south is 180; east is 90 degrees, and west is 270. In a sailboat, navigation involves choosing a numerical heading, identifying the wind speed and direction, and calculating how to set the sail in order to maneuver the boat where the captain wants to go.</p>
              <p>The scholars practiced on the small boats, learning how to position the sail at the proper angle to the wind to make the boat move while keeping it under control. One exercise involved heeling the boat to the lean point: making it tip sideways, so close to water that the scholars could put their hands in the bay. They also steered using the tiller, compensating for both the wind and the direction of the currents and tides.</p>
              <p>The scholars got to put all their skills into practice aboard the Christeen. It took all their combined strength to pull the ropes and raise the mainsail when Capt. Pete Macandrew called, “Ready on peak halyard? Ready on throat halyard? Haul all!”</p>
              <p>After the sails were set and the Christeen was cutting cleanly through the water, Capt. Macandrew asked, “What point of sail are we?” Every scholar knew the answer: “Close hauled sail,” meaning the sail was positioned close to the direction of the wind. Seventh-grader Jordan Burt even stood facing the wind with his arms stretched out in front of him to better find where the wind was coming from.</p>
              <p>That was math in action – and the scholars loved it.</p>`,
  },
  {
    slug: 'history-1',
    chapterName: 'History',
    title: 'Field Studies',
    aboveFoldSelector: '#above-fold',
    content: `<p id="${aboveFoldSelector}">Field study is an integral part of middle school education. When classroom curriculum connects to real-world experiences, scholars can extend their learning and find additional wonder in their surroundings. We frequently introduce our students to new cultural experiences and institutions. Our scholars live in the greatest city in the world, and we take advantage of it!</p>
              <p>Here are some recent field studies designed to deepen scholar understanding of past and future topics of study:</p>
              <table>
                <tr>
                  <th>Grade(s)</th>
                  <th>Venue</th>
                  <th>Exhibit/Program</th>
                  <th>Connection to Study Topics</th>
                </tr>
                <tr>
                  <td>Grade 5</td>
                  <td>The Metropolitan Museum of Art</td>
                  <td>Ancient Egypt and Art of the Ancient Near East</td>
                  <td>Mesopotamian and/or Egyptian artwork and artifacts</td>
                </tr>
                <tr>
                  <td>Grade 5</td>
                  <td>The Brooklyn Museum</td>
                  <td>Egypt Reborn: Art for Eternity/Assyrian Reliefs</td>
                  <td>Ancient Egyptian artwork</td>
                </tr>
                <tr>
                  <td>Grade 6</td>
                  <td>American Museum of Natural History</td>
                  <td>American Indian Collections (South America, Central America and Mexico, American Indians)</td>
                  <td>Native peoples of the Americas</td>
                </tr>
                <tr>
                  <td>Grade 6 &amp; 7</td>
                  <td>African Burial Grounds</td>
                  <td>African Burial Grounds National Monument</td>
                  <td>Trans-Atlantic Slave Trade &amp; American Slavery</td>
                </tr>
                <tr>
                  <td>Grade 7</td>
                  <td>New York Historical Society Museum &amp; Library</td>
                  <td>Underground Railroad Collection</td>
                  <td>Slavery and abolition</td>
                </tr>
              </table>`,
  },
  {
    slug: 'history-2',
    chapterName: 'History',
    title: 'The Structure of History Classes',
    aboveFoldSelector: '#above-fold',
    content: `<p id="${aboveFoldSelector}">The study of history in our middle schools allows scholars to gain perspective and context for understanding periods of political, economic, social, intellectual, and religious change. To make learning engaging, we structure classes in one of four ways.</p>
              <h4>1. Source Analysis</h4>
              <p>When scholars are introduced to new history topics, they are given a range of primary and secondary texts and materials, such as excerpts from traditional textbooks, maps, and artwork. The exposure to multiple sources on the same topic gives them the opportunity to compare different perspectives from the past and engage in lively class discussion about what they have read.</p>
              <h4>2. Research and Writing Lab</h4>
              <p>In Writing Lab, scholars research a history topic, then write assignments based on what they learned. Scholars are asked to write in several genres, from research papers to original myths to editorials. The writing goals are frequently aligned with the work scholars are already doing in their English classes, integrating their literacy education.</p>
              <h4>3. Debate and Socratic Seminar</h4>
              <p>It is critical for scholars to develop their speaking and listening skills, as well as be able to construct and defend an argument. Scholars recreate debates from the past by taking on the roles of historical  figures, connecting history to current events from a personal point of view. Socratic Seminar provides a more structured opportunity to discuss especially compelling questions while building speaking and listening skills.</p>
              <h4>4. Project-Based Learning and Presentation</h4>
              <p>History projects invite scholars to apply a wide range of creative and critical-thinking skills to a topic, giving them a richer understanding of their subject. While project-based learning is part of our daily instruction, longer-term comprehensive projects come at the end of many units. These group-based projects are not only engaging, but help develop teamwork and social skills beyond the history classroom.</p>`,
  },
  {
    slug: 'literacy-and-writing-1',
    chapterName: 'Literacy And Writing',
    title: 'Sela’s Story Draft',
    aboveFoldSelector: '#above-fold',
    content: `<p id="above-fold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
  },
  {
    slug: 'electives-1',
    chapterName: 'Electives',
    title: 'Why Debate Matters',
    aboveFoldSelector: '#above-fold',
    content: `<p id="#above-fold">In the fight for educational equality, Success Academy is doing something transformative: Our schools are changing the face of competitive debate in New York City.</p>
              <p>For the past three years, Success Academy has been sending middle school students to compete in local and national debate tournaments that were once exclusively dominated by elite schools.</p>
              <p>Thanks to a rich and varied curriculum that allows our middle school students to choose debate as an elective class, our scholars have developed the skills to compete and win against debate teams from a variety of schools, including private schools such as The Dalton School and The Hackley School and schools with gifted and talented programs.</p>
              <p>Debate teaches students the art of argumentation through rigorous preparation and teamwork. Its academic benefits are well established and some of our country’s top leaders were skilled speakers and debaters in school, including CEOs of Fortune 500 companies and former U.S. presidents.</p>
              <p>My students love to debate one another and push each other’s thinking especially on issues that are pertinent to their lives. This past April, one of our eighth graders whose family has struggled financially, took home the New York Debate League’s top award – the Golden Gavel – after giving a speech asserting that the country’s war on poverty has not failed. If it had, he said, “It would mean that no matter how hard I try, how well I do in school, or how much I practice debate, I can’t overcome the world I was born into.”</p>
              <p>Their enthusiasm and preparation was on full display again this past weekend at a highly competitive debate tournament in Westchester. Harlem West had a strong showing, including winning a debate round about the merits of police wearing body cameras against a team from the Hackley school.</p>
              <p>You can read about it in The New York Times, which published this story about Success Academy and the New York Debate League on November 17.</p>
              <p>As we expand our debate program to all our middle schools by January, we will need more volunteers who can serve as judges at competitions. If you would like to volunteer, please contact me at <a href="mailto:Maria.Williams@SASchools.org">Maria.Williams@SASchools.org</a>.</p>
              <p>We look forward to the day when the face of debate represents more of our nation’s diversity and not just a handful of scholars from a particular zip code.</p>`,
  },
  {
    slug: 'character-development-1',
    chapterName: 'Character Development',
    title: 'ACTION Now',
    aboveFoldSelector: '#above-fold',
    content: `<p id="above-fold">Middle school scholars are at a crucial crossroads in their social, emotional, and academic lives. They need consistent support to navigate all of the complexities they face during these years. One of the ways we provide such support is through our social/emotional learning program, ACTION Now. The program reinforces a safe learning environment, where all scholars are consistently observed and supported by an advisor. It also provides a specific structure for monitoring and supporting each scholar’s social and emotional growth.</p> 
              <p>Each school day begins with a 20-minute morning session called ACTION Now AM. This is a vital time of day when scholars participate in brief activities that help them prepare for the day ahead. Scholars set goals, get organized, practice focusing and make whatever other personal adjustments are needed (speaking volume, body language, etc.) to have a successful day at school.</p>
              <p>At the end of every school day, scholars have a 10-minute reflection time called ACTION Now PM. This session allows scholars to reflect on choices they made or could have made, and the effects those choices had on making their day successful or unsuccessful. Scholars document their thoughts in a Reflection Journal each day.</p>
              <p>The third component of the program is called ACTION Now Forum, which occurs most Wednesdays. The Forum creates a safe space for scholars to share their thoughts on issues relevant to their middle school experience. These group conversations are a great training ground for scholars to practice their ability to articulate their thoughts and feelings and to learn patience and grow in their capacity to listen to the opinions of others. ACTION Now Forum is a fertile ground for the awakening of personal insights, risk-taking through sharing, and self-discovery through expression.</p>`,
  },
  {
    slug: 'parental-investment-1',
    chapterName: 'Parental Investment',
    title: 'Teaching My Son to Speak Out',
    aboveFoldSelector: '#above-fold',
    content: `<p id="#above-fold">I often remind my son, Kendric, that he can speak up for himself, but there are times when parents must help their children speak out.</p>
              <p>Kendric and I went to Albany last week to speak out against a school system in crisis. We were not the only ones. Thousands of other families were there, too.</p>
              <p>For Kendric and me, the experience was moving. I was reminded of my own education in a parochial school and in one of the city’s public high schools. The stark contrast in academic rigor and discipline was a total shock.</p>
              <p>I also have seen the difference that great teachers and great schools can make from my son’s experience. Kendric went to a district school for pre-k because I knew the teacher was great. But I also knew the school did not provide the same quality education to all its students. Kendric’s teacher had high standards and made the children curious about learning, but the other pre-k class just did busy work.</p>
              <p>When it came time for kindergarten, I didn’t want Kendric doing busy work. I chose Success Academy because the teachers in every classroom and in every school all expect a lot from their students and work hard to help them achieve their goals. I know this because Kendric is now in the fifth grade and he is learning what I remember doing in high school. College is years away but he is already thinking about the SATs!</p>
              <p>I am grateful for great charter schools giving many parents like me the power to choose the education we want for our children. But the 143,000 kids in New York City who are stuck in failing schools and the 800,000 students across New York State who are not being equipped to do grade-level work, have no choice.</p>
              <p>I was proud to speak out against this social injustice with Kendric by my side.</p>
              <p>- See more at: http://www.successacademies.org/education-blog-post/teaching-my-son-to-speak-out/#sthash.GzaHmF1z.dpuf</p>`,
  }
]