package com.gamelog.game;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins="http://localhost:5173")
public class GameController {
    private final GameRepository repository;

    public GameController(GameRepository repository){this.repository=repository;}

    @GetMapping
    public List<Game> findAll(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> findOne(@PathVariable Long id){
        return repository.findById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Game create(@RequestBody Game game){
        return repository.save(game);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> update(@PathVariable Long id,@RequestBody Game input){
        return repository.findById(id).map(game -> {
            game.setTitle(input.getTitle());
            game.setPlatform(input.getPlatform());
            game.setGenre(input.getGenre());
            game.setStatus(input.getStatus());
            game.setProgress(input.getProgress());
            game.setMemo(input.getMemo());
            return ResponseEntity.ok(repository.save(game));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
