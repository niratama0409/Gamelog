package com.gamelog.game;

import jakarta.persistence.*;

@Entity
@Table(name="games")
public class Game {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String title;
    private String platform;
    private String genre;
    private String status;
    private Integer progress;
    @Column(columnDefinition="TEXT")
    private String memo;

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}
    public Long getUserId(){return userId;}
    public void setUserId(Long userId){this.userId=userId;}
    public String getTitle(){return title;}
    public void setTitle(String title){this.title=title;}
    public String getPlatform(){return platform;}
    public void setPlatform(String platform){this.platform=platform;}
    public String getGenre(){return genre;}
    public void setGenre(String genre){this.genre=genre;}
    public String getStatus(){return status;}
    public void setStatus(String status){this.status=status;}
    public Integer getProgress(){return progress;}
    public void setProgress(Integer progress){this.progress=progress;}
    public String getMemo(){return memo;}
    public void setMemo(String memo){this.memo=memo;}
}
