import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces
interface CalendarDay {
  date: Date;
  isPrevMonth: boolean;
  isNextMonth: boolean;
  event?: string;
}

interface BulletinPost {
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Page Title
  title = 'YALE SCHOOL OF ART';

  // Calendar Properties
  currentDate: Date = new Date();
  calendarDays: CalendarDay[] = [];
  events: { [key: string]: string } = {
    '2024-11-10': 'Senior Exhibition Opening',
    '2024-11-14': 'Guest Lecture Series',
    '2024-11-15': 'MFA Open Studios',
    '2024-11-18': 'Student Workshop',
    '2024-11-20': 'Faculty Exhibition',
    '2024-11-23': 'Artist Talk'
  };

  // Slider Properties
  private slideWidth = 320; // slide width + margin
  private totalSlides = 8; // total number of slides
  private currentSlideIndex = 0;
  private currentTranslate = 0;

  // Bulletin Board Properties
  showAddPostForm = false;
  showInfoMessage = false;
  bulletinPosts: BulletinPost[] = [
    {
      title: 'From our friends at the Yale Center for Environmental Justice',
      description: 'The Yale Center for Environmental Justice is in the process of planning our fourth annual Global Environmental Justice Conference...',
      fullDescription: 'The Yale Center for Environmental Justice is in the process of planning our fourth annual Global Environmental Justice Conference, with this year focusing on the theme of “Environmental Joy.” The conference aims to explore the ways in which environmental and climate justice and the communities engaged in that work generate joy. Guided by the notion that the ultimate goal of most environmental and climate work is to alleviate suffering and increase wellbeing, Environmental Joy will explore and celebrate the diverse ways that environmental justice achieves this goal.One facet of the conference programming we hope to organize is a juried art show soliciting works from artists around the world on the theme of Environmental Joy to be showcased in an exhibition during the conference. We are currently seeking any interested students or faculty who would be interested in supporting the planning and execution of this call for art. If you’re interested in learning more about the opportunity, please contact Julia Simon at julia.simon@yale.edu.',
      date: 'Nov 15',
      isExpanded: false
    },
    {
      title: 'Faculty/Alumni: Post Your Art Apprenticeship/Internship Opportunities for Undergraduates',
      description: 'The Yale Arts Apprenticeship Program is an initiative that connects Yale undergraduates...',
      fullDescription: 'The Yale Arts Apprenticeship Program is an initiative that connects Yale undergraduates, particularly those on financial aid, with professional arts practitioners of any discipline. As an option within Yale’s Summer Experience Award (SEA) funding model, the Arts Apprenticeship must fulfill the same basic requirements. Additional details, as well as those specific to the Arts Apprenticeship are included below. Yale faculty, alumni, or other arts practitioners interested in featuring positions through the program should contact Yale’s Creative Careers advisor. Which Opportunities are Eligible? Must be at least 30 hours/week, for at least 8-weeks over the summer months. Those 8-weeks do not have to be continuous if the mentoring Arts Practitioner agrees on a different schedule. The time commitment need not all be in direct contact with the Arts Practitioner. Independent projects, tasks, research, etc. can comprise much of the experience, as long as the Arts Practitioner is checking in regularly with the student to provide oversight and career-based context. The opportunity cannot be with a for-profit organization. The engagement for an Arts Apprenticeship should be directly with an individual Arts Practitioner and not with a company. The only exception to this would be if the company overseeing the apprenticeship were a registered non-profit organization. For more information: https://ocs.yale.edu/channels/arts-apprenticeship/ To post a job, contact: https://ocs.yale.edu/staff-list/#derek-i-webster',
      date: 'Nov 14',
      isExpanded: false
    },
    {
      title: 'Art Supply Exchange',
      description: 'Bring your unused supplies to trade',
      fullDescription: 'Annual art supply exchange event. Bring your gently used or unused art supplies to trade with fellow artists.',
      date: 'Nov 13',
      isExpanded: false
    }
  ];
  newPost: BulletinPost = {
    title: '',
    description: '',
    fullDescription: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
    isExpanded: false
  };

  // Quick Links Properties
  showQuickLinks = false;

  ngOnInit() {
    this.generateCalendar();
  }

  // Calendar Methods
  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
    // Add days from previous month
    const firstDayWeekday = firstDay.getDay();
    for (let i = firstDayWeekday; i > 0; i--) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - i);
      this.calendarDays.push({
        date,
        isPrevMonth: true,
        isNextMonth: false
      });
    }

    // Add days of current month
    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      this.calendarDays.push({
        date: new Date(date),
        isPrevMonth: false,
        isNextMonth: false,
        event: this.events[dateString]
      });
    }

    // Add days from next month
    const remainingDays = 42 - this.calendarDays.length; // 6 rows × 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDay);
      date.setDate(date.getDate() + i);
      this.calendarDays.push({
        date,
        isPrevMonth: false,
        isNextMonth: true
      });
    }
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  getMonthAndYear(): string {
    return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  // Slider Methods
  slideNext(): void {
    // ... slide next logic
  }

  slidePrev(): void {
    // ... slide previous logic
  }

  // Bulletin Board Methods
  togglePost(index: number): void {
    this.bulletinPosts[index].isExpanded = !this.bulletinPosts[index].isExpanded;
  }

  addNewPost(): void {
    if (this.newPost.title && this.newPost.description) {
      this.bulletinPosts.unshift({
        ...this.newPost,
        fullDescription: this.newPost.description
      });
      this.resetNewPost();
    }
  }

  private resetNewPost(): void {
    this.newPost = {
      title: '',
      description: '',
      fullDescription: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      isExpanded: false
    };
    this.showAddPostForm = false;
  }

  // UI Toggle Methods
  toggleAddPostForm(): void {
    this.showAddPostForm = !this.showAddPostForm;
  }

  toggleInfoMessage(): void {
    this.showInfoMessage = !this.showInfoMessage;
  }

  toggleQuickLinks(): void {
    this.showQuickLinks = !this.showQuickLinks;
  }

  // Event Listeners
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const container = document.querySelector('.quick-links-container');
    if (container && !container.contains(event.target as Node)) {
      this.showQuickLinks = false;
    }
  }
}
